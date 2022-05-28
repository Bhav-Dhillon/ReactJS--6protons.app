import { useState, Suspense, useRef} from 'react'
import { Canvas, useFrame, } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial, Html, MeshWobbleMaterial} from '@react-three/drei'
import * as random from "maath/random";
import { useSpring, a } from "react-spring/three"

// Imported Components
import Hero from './components/Hero'
import TestModel from './components/TestModel.jsx'
import * as THREE from 'three'




export default function App() {

  const [page, setPage] = useState('home');

  // Refactor these into a single object
  const [flipped, setFlipped] = useState(false);
  const [moved, setMoved] = useState(false);
  const [txtAn, setTxtAn] = useState(false);

  const [clicked, setClicked] = useState(false);

  // useFrame((state) => {
  //   // state.camera.position.lerp([0, 0, z], )
  // })

  function rotateModel()
  {
    setFlipped(!flipped);
  }


    return (
      <>
        { clicked ? <LessonSelection /> : <Hero />}

        <button className="btn fill-center fill-center--blue" onMouseEnter={rotateModel} onMouseLeave={rotateModel} style={clicked ? {marginTop: 100, border:'1px solid white', color: 'white'} : {marginTop: 0}} onClick={() => {
          // setMoved(true)
          // setTxtAn(true)
          // window.setTimeout(() => setPage('lesson-selection'), 100 )
          setClicked(!clicked)
        }}>{clicked ? "Back to Home" : "Get Started"}</button>


        {/* // 3D Background + Model */}
        <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0,5] }}>

          <color attach="background" args={["#000000"]} />

          {/* <OrbitControls/> */}

          <Suspense fallback={null}>
            <spotLight position={[10, 10, 10] } intensity={1}/>
            <ambientLight intensity={.4} />
            <TestModel flipped={flipped} moved={moved} />
            <Stars clicked={clicked}/>
          </Suspense>

          {/* <LessonMesh color='#2a60f8' args={[6, 4, .5]} speed={.75}/> */}
        </Canvas>

      </>
    );
  }

  
{/* <Html scale={.81} position={[0, -.33, -1]} transform occlude>
  <div className='hero--txt--html'>
    Learn Chemistry by Seeing.
  </div>
</Html> */}



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
  const [sphere] = useState(() => random.inSphere(new Float32Array(15000), { radius: 3.5 }))


  useFrame((state, delta) =>
  {
    // Rotating Stars:
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15

    // Camera zoom-in animation on load: 
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 1, 0.07)

    // Rotating camera on button click:
    state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, (props.clicked ? (Math.PI) : 0), 0.05)


    // state.camera.lookAt(0,0, (state.camera.position.z - 5))
    // state.camera.updateProjectionMatrix()
  })
  return (
    <>
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
          <PointMaterial transparent color="#fff" size={0.005} sizeAttenuation={true} depthWrite={false} />
        </Points>
      </group>
    </>

  )
}


function LessonSelection()
{
  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
        <h1 className='lessonSelection--title'>Please choose a lesson.</h1>
      </div>
      <div className='lessonSelection-wrapper'>
        <section className='lessonSelection--container'></section>
        <section className='lessonSelection--container'></section>
        <section className='lessonSelection--container'></section>
      </div>
    </>
  )

}






const LessonMesh = ({ position, color, speed, args }) =>
{
  //ref to target the mesh
  const mesh = useRef();
  //Basic expand state
  const [expand, setExpand] = useState(false);
  // React spring expand animation
  const props = useSpring({
    scale: expand ? [.2, .2, .2] : [.2, .2, .2],
  });

  return (
    <>
      <directionalLight position={[10, 10, -10] } intensity={1}/>
      <a.mesh
        rotation={[0, Math.PI, -Math.PI / 2]}
        position={[0, 0, 3]}
        ref={mesh}
        onClick={() => setExpand(!expand)}
        scale={props.scale}
        castShadow>
        <boxBufferGeometry attach='geometry' args={args} />
        <MeshWobbleMaterial
          color={color}
          speed={speed}
          attach='material'
          factor={0.3}
        />
      </a.mesh>
      <a.mesh
        rotation={[0, Math.PI, -Math.PI / 2]}
        position={[1.5, 0, 3]}
        ref={mesh}
        onClick={() => setExpand(!expand)}
        scale={props.scale}
        castShadow>
        <boxBufferGeometry attach='geometry' args={args} />
        <MeshWobbleMaterial
          color={color}
          speed={speed}
          attach='material'
          factor={0.3}
        />
      </a.mesh>
      <a.mesh
        rotation={[0, Math.PI, -Math.PI / 2]}
        position={[-1.5, 0, 3]}
        ref={mesh}
        onClick={() => console.log('clicked')}
        scale={props.scale}
        castShadow>
        <boxBufferGeometry attach='geometry' args={args} />
        <MeshWobbleMaterial
          color={color}
          speed={speed}
          attach='material'
          factor={0.3}
        />
      </a.mesh>
    </>


  );
};