import React from 'react'
import Logo from '../images/logo.png'


export default function Hero(props)
{
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
            {/* <div style={{ position: 'absolute', top: 27, left: 44, fontSize: '20px' }}>
                <img src={Logo} style={{ width: 50, height: "auto" }} />
            </div> */}
            <div style={{ position: 'absolute', top: 20, left: 20, fontSize: '20px', fontWeight: 300 }}>6 Protons</div>
            <div className='hero' >
                <h1 style={{ margin: 0, padding: 0, fontSize: '6em', fontWeight: 500, letterSpacing: '-0.05em' }} className={(props.txtAn ? 'hero--txt--animation' : '')}>Learn by Seeing.</h1>
                <p className='hero--subtitle'>An introduction to the chemistry of the 6th atom of our universe, <span>Carbon.</span></p>
            </div>
        </div>
    )
}