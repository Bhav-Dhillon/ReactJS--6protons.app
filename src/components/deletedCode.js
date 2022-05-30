// Old Button:

{/* <button className="btn fill-center fill-center--blue" onMouseEnter={rotateModel} onMouseLeave={rotateModel} style={clicked ? {marginTop: 100, border:'1px solid white'} : {marginTop: 0}} onClick={() => {
    // setMoved(true)
    // setTxtAn(true)
    // window.setTimeout(() => setPage('lesson-selection'), 100 )
    setClicked(!clicked)
}}>{clicked ? "Back to Home" : "Get Started"}</button> */}


// Old Lesson Selection
function LessonSelection()
{
    useEffect(() =>
    {
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




// Not Sure:

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