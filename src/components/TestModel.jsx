import { useRef, useState } from 'react'
import {useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'


export default function TestModel(props) 
{
    const ref = useRef()
    const { nodes, materials } = useGLTF('/testosterone2-transformed.glb')

    useFrame((state) => {
        // props.flipped ? ref.current.rotation.set((Math.PI / 2) , 0, 0) : ref.current.rotation.set(0 , 0, 0)
        ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, props.flipped ? (Math.PI) : 0 , 0.1)
        ref.current.rotation.z = Math.sin((state.clock.elapsedTime) * 1.5) / 8
        ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, props.moved ? 10 : -0.08 , 0.075)
    })

    return (
        <group {...props} dispose={null}>
            <group ref={ref} position={[-0.12, 1.25, -4]} scale={0.14} rotation={[(Math.PI /2), 0 , 0]}>
                <mesh geometry={nodes.SurfSphere.geometry} material={materials.Oxygen} />
                <mesh geometry={nodes.SurfSphere_1.geometry} material={materials.Carbon} />
                <mesh geometry={nodes.SurfSphere_2.geometry} material={materials.Hydrogen} />
            </group>
        </group>
    )
}
