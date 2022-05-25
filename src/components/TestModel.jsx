import { useRef, useState } from 'react'
import {useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'


export default function TestModel(props) 
{
    const ref = useRef()
    const { nodes, materials } = useGLTF('/testosterone2-transformed.glb')

    const [data] = useState({
    // x: THREE.MathUtils.randFloatSpread(2), // returns a value between -1 and 1 (cuts value in half and returns + and - of that)
    // y: THREE.MathUtils.randFloatSpread(height), 
    // rX: Math.random() * Math.PI,
    // rY: Math.random() * Math.PI,
    // rZ: Math.sin((Math.PI / 4))
    })

    useFrame((state) => {
        // props.flipped ? ref.current.rotation.set((Math.PI / 2) , 0, 0) : ref.current.rotation.set(0 , 0, 0)
        ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, props.flipped ? (Math.PI) : 0 , 0.1)
        ref.current.rotation.z = Math.sin((state.clock.elapsedTime)) / 8
    })

    return (
        <group {...props} dispose={null}>
            <group ref={ref} position={[-0.08, 1.25, -4]} scale={0.14} rotation={[(Math.PI /2), 0 , 0]}>
                <mesh geometry={nodes.SurfSphere.geometry} material={materials.Oxygen} />
                <mesh geometry={nodes.SurfSphere_1.geometry} material={materials.Carbon} />
                <mesh geometry={nodes.SurfSphere_2.geometry} material={materials.Hydrogen} />
            </group>
        </group>
    )
}
