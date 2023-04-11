import React from 'react'
import "./assets/scss/contact.scss";
import { Footer, NavBar } from '../components'
import { Link } from 'react-router-dom'
const Banner = require.context("./assets/img", true);
export const Contact = () => {
  return (
    <>
    <NavBar />
    <h1 className='next2'>¿Aun tienes<span> dudas</span> ?</h1>
    <p className='sub3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ante diam, egestas at nisl at,
                lobortis lacinia augue. Mauris neque magna, feugiat id vestibulum et, cursus ac risus. Aliquam erat volutpat.
                Pellentesque non gravida nulla. Integer sed scelerisque lacus. Nam interdum nunc et purus tristique viverra.
                Integer mauris sem, placerat vel ante at, tincidunt sollicitudin nisi. Nullam porttitor a dolor eu dignissim.
                Quisque sit amet sodales ante, ultrices sollicitudin massa. Orci varius natoque penatibus et magnis dis parturient
                montes, nascetur ridiculus mus. Nam in purus quis ipsum suscipit vulputate. Sed eu purus tincidunt, varius lectus id, pretium nibh.
                Ut lobortis finibus odio, et laoreet neque hendrerit eget. Vivamus accumsan, ante sed varius rutrum, magna arcu rutrum lectus, vel ullamcorper
                purus elit sit amet nisl.
                <br /><br /><br />
                <br /><br />
            </p>
    <div className='cont-contact'>
        <div className='form'>
        <form>
            <br/>
            <input className='input' placeholder='Digite su correo electronico' />
            <br />
            <textarea className='texta' placeholder='Digita tu duda'/>
            <button className="readMoreBtn bgBtnt2">Enviar</button>
        </form>
        </div>
    <img className='kid3' src={Banner("./niños/dochild.png")} />
    </div>
    <Footer />
    </>
  )
}
