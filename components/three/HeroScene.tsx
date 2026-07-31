"use client"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { gsap } from "gsap"
import { gatePromise } from "@/lib/gate"

/**
 * Dark sculptural composition: a broken torus arch, a reflective disc and a
 * slab, lit by a single warm rim light against the ink panel behind it.
 */
export default function HeroScene() {
	const mountRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const mount = mountRef.current
		if (!mount) return
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
		renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
		renderer.setSize(mount.clientWidth, mount.clientHeight)
		renderer.toneMapping = THREE.ACESFilmicToneMapping
		renderer.toneMappingExposure = 1.1
		mount.appendChild(renderer.domElement)

		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(35, mount.clientWidth / mount.clientHeight, 0.1, 50)
		camera.position.set(0, 0.15, 7)

		const pmrem = new THREE.PMREMGenerator(renderer)
		scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

		const group = new THREE.Group()
		scene.add(group)

		const archMat = new THREE.MeshStandardMaterial({
			color: 0x2b251c,
			metalness: 0.6,
			roughness: 0.3,
			envMapIntensity: 0.55,
		})
		const arch = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.5, 96, 200, Math.PI * 1.35), archMat)
		arch.rotation.z = Math.PI * 0.62
		group.add(arch)

		const discMat = new THREE.MeshStandardMaterial({
			color: 0x3d352a,
			metalness: 0.9,
			roughness: 0.16,
			envMapIntensity: 0.8,
		})
		const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.92, 0.1, 96), discMat)
		disc.rotation.x = Math.PI / 2
		disc.position.set(0.15, -0.1, 0.4)
		group.add(disc)

		const slabMat = new THREE.MeshStandardMaterial({
			color: 0x1f1a13,
			metalness: 0.35,
			roughness: 0.5,
			envMapIntensity: 0.4,
		})
		const slab = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2.6, 0.55), slabMat)
		slab.position.set(-1.35, -1.3, -0.9)
		slab.rotation.y = 0.35
		group.add(slab)

		const key = new THREE.DirectionalLight(0xeac287, 5)
		key.position.set(3, 4, 2.5)
		scene.add(key)
		const fill = new THREE.DirectionalLight(0x8a7355, 1.1)
		fill.position.set(-4, -1, 3)
		scene.add(fill)
		scene.add(new THREE.AmbientLight(0x1c1812, 1.5))

		// pointer parallax, lerped outside React state
		const target = { x: 0, y: 0 }
		const eased = { x: 0, y: 0 }
		const onPointer = (e: PointerEvent) => {
			target.x = (e.clientX / window.innerWidth) * 2 - 1
			target.y = (e.clientY / window.innerHeight) * 2 - 1
		}
		if (!reduce) window.addEventListener("pointermove", onPointer, { passive: true })

		let raf = 0
		let running = false
		let visible = true
		const clock = new THREE.Clock()

		const render = () => {
			const t = clock.getElapsedTime()
			eased.x += (target.x - eased.x) * 0.04
			eased.y += (target.y - eased.y) * 0.04
			group.rotation.y = Math.sin(t * 0.12) * 0.18 + eased.x * 0.12
			group.rotation.x = Math.cos(t * 0.1) * 0.05 - eased.y * 0.08
			disc.rotation.z = t * 0.15
			renderer.render(scene, camera)
		}

		const loop = () => {
			render()
			raf = requestAnimationFrame(loop)
		}
		const setRunning = (on: boolean) => {
			if (on && !running && !reduce) {
				running = true
				raf = requestAnimationFrame(loop)
			} else if (!on && running) {
				running = false
				cancelAnimationFrame(raf)
			}
		}

		const io = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting
			setRunning(visible && !document.hidden)
		})
		io.observe(mount)
		const onVis = () => setRunning(visible && !document.hidden)
		document.addEventListener("visibilitychange", onVis)

		render()
		gatePromise.then(() => {
			if (reduce) return
			gsap.fromTo(group.scale, { x: 0.85, y: 0.85, z: 0.85 }, { x: 1, y: 1, z: 1, duration: 1.6, ease: "power3.out" })
			gsap.fromTo(renderer.domElement, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, ease: "power2.out" })
		})

		const ro = new ResizeObserver(() => {
			const w = mount.clientWidth
			const h = mount.clientHeight
			if (!w || !h) return
			camera.aspect = w / h
			camera.updateProjectionMatrix()
			renderer.setSize(w, h)
			if (!running) render()
		})
		ro.observe(mount)

		return () => {
			setRunning(false)
			io.disconnect()
			ro.disconnect()
			document.removeEventListener("visibilitychange", onVis)
			window.removeEventListener("pointermove", onPointer)
			scene.traverse(obj => {
				if (obj instanceof THREE.Mesh) {
					obj.geometry.dispose()
					;(obj.material as THREE.Material).dispose()
				}
			})
			pmrem.dispose()
			renderer.dispose()
			mount.removeChild(renderer.domElement)
		}
	}, [])

	return <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />
}
