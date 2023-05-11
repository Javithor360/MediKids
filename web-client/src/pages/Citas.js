import React from 'react'
import { Link } from 'react-router-dom';
import { NavBar, Footer } from '../components';
import "./assets/scss/citas.scss";
const Banner = require.context("./assets/img", true);
export const Citas = () => {
    return (
        <>
            <NavBar />
            <h1 className='tittle1'>Requisitos para agendar una <span className='color1'>cita</span></h1>
            <div className='cont-espk'>
      <div className='w-[40%] h-[100%] flex items-center'>
        <img className='first' src={Banner('./niños/docchild.png')} />
      </div>
      <div className='cont-esp'>
      <p className='sub'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ante diam, egestas at nisl at,
                lobortis lacinia augue. Mauris neque magna, feugiat id vestibulum et, cursus ac risus. Aliquam erat volutpat.
                Pellentesque non gravida nulla. Integer sed scelerisque lacus. Nam interdum nunc et purus tristique viverra.
                Integer mauris sem, placerat vel ante at, tincidunt sollicitudin nisi. Nullam porttitor a dolor eu dignissim.
                Quisque sit amet sodales ante, ultrices sollicitudin massa. Orci varius natoque penatibus et magnis dis parturient
                montes, nascetur ridiculus mus. Nam in purus quis ipsum suscipit vulputate. Sed eu purus tincidunt, varius lectus id, pretium nibh.
                Ut lobortis finibus odio, et laoreet neque hendrerit eget. Vivamus accumsan, ante sed varius rutrum, magna arcu rutrum lectus, vel ullamcorper
                purus elit sit amet nisl.
        <br/><br/><br/>
        <div className="list-item">
                            <p className="roundedStep">1</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, tempore?</p>
                        </div>
                        <br/><br/>
                        <div className="list-item">
                            <p className="roundedStep">2</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis magni expedita minus?</p>
                        </div>
                        <br/><br/>
                        <div className="list-item">
                            <p className="roundedStep">3</p>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi, fuga.</p>
                        </div>
        </p>
      </div>
      </div>
            <hr />
            <h1 className='tittle2'>Recuerda tomar en <span>cuenta</span></h1>
            <div className='cont-child'>
           <div className='cont-esp'>
           <p className='sub2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ante diam, egestas at nisl at,
                lobortis lacinia augue. Mauris neque magna, feugiat id vestibulum et, cursus ac risus. Aliquam erat volutpat.
                Pellentesque non gravida nulla. Integer sed scelerisque lacus. Nam interdum nunc et purus tristique viverra.
                Integer mauris sem, placerat vel ante at, tincidunt sollicitudin nisi. Nullam porttitor a dolor eu dignissim.
                Quisque sit amet sodales ante, ultrices sollicitudin massa. Orci varius natoque penatibus et magnis dis parturient
                montes, nascetur ridiculus mus. Nam in purus quis ipsum suscipit vulputate. Sed eu purus tincidunt, varius lectus id, pretium nibh.
                Ut lobortis finibus odio, et laoreet neque hendrerit eget. Vivamus accumsan, ante sed varius rutrum, magna arcu rutrum lectus, vel ullamcorper
                purus elit sit amet nisl.
            </p>
           </div>
            <div className='w-[30%] h-[100%] flex items-center'>
            <img className='kid2' src={Banner("./niños/child.png")} />
            </div>
            </div>
            <hr/>
            <h1 className='tittle1'>Pasos para agendar una <span>cita</span></h1>
            <div className='cont-espk'>
      <div className='w-[40%] h-[100%] flex items-center'>
        <img className='first' src={Banner('./niños/docse.png')} />
      </div>
      <div className='cont-esp'>
      <p className='sub'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ante diam, egestas at nisl at,
                lobortis lacinia augue. Mauris neque magna, feugiat id vestibulum et, cursus ac risus. Aliquam erat volutpat.
                Pellentesque non gravida nulla. Integer sed scelerisque lacus. Nam interdum nunc et purus tristique viverra.
                Integer mauris sem, placerat vel ante at, tincidunt sollicitudin nisi. Nullam porttitor a dolor eu dignissim.
                Quisque sit amet sodales ante, ultrices sollicitudin massa. Orci varius natoque penatibus et magnis dis parturient
                montes, nascetur ridiculus mus. Nam in purus quis ipsum suscipit vulputate. Sed eu purus tincidunt, varius lectus id, pretium nibh.
                Ut lobortis finibus odio, et laoreet neque hendrerit eget. Vivamus accumsan, ante sed varius rutrum, magna arcu rutrum lectus, vel ullamcorper
                purus elit sit amet nisl.
        <br/><br/><br/>
        <div className="list-item">
                            <p className="roundedStep">1</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, tempore?</p>
                        </div>
                        <br/><br/>
                        <div className="list-item">
                            <p className="roundedStep">2</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis magni expedita minus?</p>
                        </div>
                        <br/><br/>
                        <div className="list-item">
                            <p className="roundedStep">3</p>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi, fuga.</p>
                        </div>
                        <Link className="boton __moreView absolute bottom-30 right-11" to="/download-app">Descargar App</Link>
        </p>
      </div>
      </div>
            <Footer />
        </>
    )
}
