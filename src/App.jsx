import { useState, Suspense, useRef} from 'react'
import { Canvas, useFrame, } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial} from '@react-three/drei'
import * as random from "maath/random";

import TestModel from './components/TestModel.jsx'


export default function App() {
  const [flipped, setFlipped] = useState(false);

  function rotateModel()
  {
    setFlipped(!flipped);
  }

  return (
    <>
      <Canvas gl={{alpha: false}} camera={{ near: 0.01, far: 20, fov: 75, position: [0,0,1] }} dpr={[1, 2]}>
        <color attach="background" args={["#000000"]} />
        <OrbitControls/>
        <Suspense fallback={null}>
          <spotLight position={[10, 10, 10] } intensity={1}/>
          <ambientLight intensity={.4} />
          <TestModel flipped={flipped}/>
          <Stars/>
        </Suspense>
      </Canvas>
      <button className="btn fill-center fill-center--blue"
      onMouseEnter={rotateModel}
      onMouseLeave={rotateModel}
      >
      Get Started
      </button>
    </>
  );
}


function Stars(props)
{
  const ref = useRef()
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))

  useFrame((state, delta) =>
  {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#fff" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}
