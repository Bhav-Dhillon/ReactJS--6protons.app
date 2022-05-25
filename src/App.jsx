import { useState, Suspense, useRef} from 'react'
import { Canvas, useFrame, } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial} from '@react-three/drei'
import * as random from "maath/random";
// Imported Components
import Hero from './components/Hero'
import TestModel from './components/TestModel.jsx'



export default function App() {

  const [page, setPage] = useState('home');

  // Refactor these into a single object
  const [flipped, setFlipped] = useState(false);
  const [moved, setMoved] = useState(false);
  const [txtAn, setTxtAn] = useState(false);

  function rotateModel()
  {
    setFlipped(!flipped);
  }


    return (
      <>
        {page === 'home' ? <Hero txtAn={txtAn}/> : <LessonSelection />}

        <button className="btn fill-center fill-center--blue" onMouseEnter={rotateModel} onMouseLeave={rotateModel} onClick={() => {
          setMoved(true)
          setTxtAn(true)
          window.setTimeout(() => setPage('lesson-selection'), 100 )
        }}>Get Started</button>

        {/* // 3D Background + Model */}
        <Canvas gl={{alpha: false}} camera={{ near: 0.01, far: 20, fov: 75, position: [0,0,1] }} dpr={[1, 2]}>
          <color attach="background" args={["#000000"]} />
          <Suspense fallback={null}>
            <spotLight position={[10, 10, 10] } intensity={1}/>
            <ambientLight intensity={.4} />
            <TestModel flipped={flipped} moved={moved}/>
            <Stars/>
          </Suspense>
        </Canvas>

      </>
    );
  }

  // else if (page === 'lesson-selection')
  // {
  //   return (
  //     <>
  //       <Canvas gl={{alpha: false}} camera={{ near: 0.01, far: 20, fov: 75, position: [0,0,1] }} dpr={[1, 2]}>
  //         <color attach="background" args={["#000000"]} />
  //         <Suspense fallback={null}>
  //           {/* <spotLight position={[10, 10, 10] } intensity={1}/> */}
  //           {/* <ambientLight intensity={.4} /> */}
  //           <Stars/>
  //         </Suspense>
  //       </Canvas>
  //       {/* <h1>Please select a lesson</h1> */}
  //     </>

  //   )
  // }



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


function LessonSelection()
{
  return (
    <div className='lessonSelection-wrapper'>
      <section className='lessonSelection--container'></section>
      <section className='lessonSelection--container'></section>
      <section className='lessonSelection--container'></section>
    </div>
  )
}