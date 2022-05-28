import { useState, Suspense, useRef, useEffect} from 'react'
import { Canvas, useFrame, } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial, Html, MeshWobbleMaterial} from '@react-three/drei'
import * as random from "maath/random";
import { useSpring, a } from "react-spring/three"
// import CardAn from './cardAn';

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

  const [clicked, setClicked] = useState(true);

  // useFrame((state) => {
  //   // state.camera.position.lerp([0, 0, z], )
  // })

  function rotateModel()
  {
    setFlipped(!flipped);
  }


    return (
      <>
        { clicked ? <LessonSelectionProtoype /> : <Hero />}

        <button className="btn fill-center fill-center--blue" onMouseEnter={rotateModel} onMouseLeave={rotateModel} style={clicked ? {marginTop: 100, border:'1px solid white'} : {marginTop: 0}} onClick={() => {
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
  const [sphere] = useState(() => random.inSphere(new Float32Array(15000), { radius: 2.5 }))


  useFrame((state, delta) =>
  {
    // Rotating Stars:
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15

    // Camera zoom-in animation on load: 
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 1, 0.07)

    // Rotating camera on button click:
    state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, (props.clicked ? (Math.PI) : 0), 0.05)

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
  useEffect(() => {
    const frame = document.querySelector('.frame')
    const card = document.querySelector('.lessonSelection--container')
    const light = document.querySelector('.light')

    const frames = Array.from(document.querySelector('.frame'), (frame) => frame)
    console.log(frames);


    const cards = Array.from()
    const lights = Array.from()

    let { x, y, width, height } = frame.getBoundingClientRect()

    function mouseMove(e)
    { 
        const left = e.clientX - x
        const top = e.clientY - y
        const centerX = left - width / 2
        const centerY = top - height / 2
        const d = Math.sqrt(centerX ** 2 + centerY ** 2)



        card.style.boxShadow = `
        ${-centerX / 5}px ${-centerY / 10}px 10px rgba(0, 0, 0, 0.2)`

        card.style.transform = `
        rotate3d(${-centerY / 100}, ${centerX / 100}, 0, ${d / 8}deg)`

        light.style.backgroundImage = `
        radial-gradient(circle at ${left}px ${top}px, #00000040, #ffffff00, #ffffff99)`
    }

    frame.addEventListener('mouseenter', () =>
    {
        frame.addEventListener('mousemove', mouseMove)
    })

    frame.addEventListener('mouseleave', () =>
    {
        frame.removeEventListener('mousemove', mouseMove)
        card.style.boxShadow = ''
        card.style.transform = ''
        light.style.backgroundImage = ''
    })
  }) 
  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
        <h1 className='lessonSelection--title'>Please select a lesson.</h1>
      </div>
      <div className='lessonSelection-wrapper'>
        <div className='frame'>
          <section className='lessonSelection--container'><div className='light'></div></section>
        </div>
        <div className='frame'>
          <section className='lessonSelection--container'></section>
        </div>
        <div className='frame'>
          <section className='lessonSelection--container'></section>
        </div>

      </div>
    </>
  )

}

function LessonSelectionProtoype()
{
  // const frame = document.querySelector('.frame')
  // const card = document.querySelector('.card')
  // const light = document.querySelector('.light')

  // // const frames = Array.from(document.querySelectorAll('.frame'), (frame, i) => frame.)
  // // console.log(frames);

  // let { x, y, width, height } = frame.getBoundingClientRect()

  // function mouseMove(e)
  // { 
  //     const left = e.clientX - x
  //     const top = e.clientY - y
  //     const centerX = left - width / 2
  //     const centerY = top - height / 2
  //     const d = Math.sqrt(centerX ** 2 + centerY ** 2)

  //     card.style.boxShadow = `
  //     ${-centerX / 5}px ${-centerY / 10}px 10px rgba(0, 0, 0, 0.2)`

  //     card.style.transform = `
  //     rotate3d(${-centerY / 100}, ${centerX / 100}, 0, ${d / 8}deg)`

  //     light.style.backgroundImage = `
  //     radial-gradient(circle at ${left}px ${top}px, #00000040, #ffffff00, #ffffff99)`
  // }

  // useEffect(() => {


    // const frames = Array.from(document.querySelectorAll('.frame'), (frame, i) => frame.)
    // console.log(frames);

    

    // function mouseMove(e)
    // { 
    //   const frame = document.querySelector('.frame')
    //   const card = document.querySelector('.card')
    //   const light = document.querySelector('.light')
    //   let { x, y, width, height } = frame.getBoundingClientRect()
    //   const left = e.clientX - x
    //   const top = e.clientY - y
    //   const centerX = left - width / 2
    //   const centerY = top - height / 2
    //   const d = Math.sqrt(centerX ** 2 + centerY ** 2)

    //   card.style.boxShadow = `
    //   ${-centerX / 5}px ${-centerY / 10}px 10px rgba(0, 0, 0, 0.2)`

    //   card.style.transform = `
    //   rotate3d(${-centerY / 100}, ${centerX / 100}, 0, ${d / 8}deg)`

    //   light.style.backgroundImage = `
    //   radial-gradient(circle at ${left}px ${top}px, #00000040, #ffffff00, #ffffff99)`
    // }

    // frames.forEach((frame) => 
    // {
    //   frame.addEventListener('mouseenter', () =>
    //     {
    //       frame.addEventListener('mousemove', mouseMove)
    //     })

    //   frame.addEventListener('mouseleave', () =>
    //     {
    //       frame.removeEventListener('mousemove', mouseMove)
    //       card.style.boxShadow = ''
    //       card.style.transform = ''
    //       light.style.backgroundImage = ''
    //     })
    // })
  // })



  function Card(props) 
  {
    const frame = useRef();
    const card = useRef(); 
    const light = useRef();

    function mouseMove(e)
    { 
      let { x, y, width, height } = frame.current.getBoundingClientRect()
      const left = e.clientX - x
      const top = e.clientY - y
      const centerX = left - width / 2
      const centerY = top - height / 2
      const d = Math.sqrt(centerX ** 2 + centerY ** 2)
  
      card.current.style.boxShadow = `
      ${-centerX / 5}px ${-centerY / 10}px 10px rgba(0, 0, 0, 0.2)`
  
      card.current.style.transform = `
      rotate3d(${-centerY / 100}, ${centerX / 100}, 0, ${d / 8}deg)`
  
      light.current.style.backgroundImage = `
      radial-gradient(circle at ${left}px ${top}px, #00000040, #ffffff00, #ffffff99)`
    }
  
    function mouseLeave()
    {
      frame.current.removeEventListener('mousemove', mouseMove)
      card.current.style.boxShadow = ''
      card.current.style.transform = ''
      light.current.style.backgroundImage = ''
    }

    return (
      <div className="frame" onMouseMove={mouseMove} onMouseLeave={mouseLeave} ref={frame}>
        <div className="card" ref={card}>
          <div className="light" ref={light}></div>
        </div>
      </div>
    )
  }
  


  return (
    <>
      {/* <div sty le={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
      </div> */}
      <div className='lessonSelection-wrapper'>
        <h1 className='lessonSelection--title'>Please select a lesson.</h1>
        <div className='card--wrapper'>
          <Card id={0}/>
          <Card id={1}/>
          <Card id={2}/>
          {/* <Card id={0} mouseMove={mouseMove} mouseLeave={mouseLeave}/>
          <Card id={1} mouseMove={mouseMove} mouseLeave={mouseLeave}/>
          <Card id={2} mouseMove={mouseMove} mouseLeave={mouseLeave}/> */}
        </div>
      </div>
    </>

  )
}