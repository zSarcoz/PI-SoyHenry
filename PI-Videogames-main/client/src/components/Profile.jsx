import React from "react";
import s from "./styles/Profile.module.css";
import imgProfile from "./styles/Profile.png";
import twitch from "./images/twitch.png";
import steam from "./images/steam.png";
import upcoming from "./images/upcoming.png";
import library from "./images/library.png";
import controller from "./images/controller.png";
import assassins from "./images/assassins.png";
import sackboy from "./images/sackboy.png";
import spiderman from "./images/spiderman.png";
import Header from "./Header";


export default function Card() {
    return(
        <>
            <Header />
        <main className={s.main}>
            <section className={s.glass}>
                <div className={s.dashboard}>
                    <div className={s.user}>
                        <img className={s.imgProfile} src={imgProfile} alt="" />
                        <h3 className={s.h3}>Username</h3>
                        <p className={s.p}>Pro Member</p>
                    </div>
                    <div className={s.links}>
                        <div className={s.link}>
                            <img className={s.img} src={twitch} alt="" />
                            <h2 className={s.h2}>Streams</h2>
                        </div>
                        <div className={s.link}>
                            <img className={s.img} src={steam} alt="" />
                            <h2 className={s.h2}>Games</h2>
                        </div>
                        <div className={s.link}>
                            <img className={s.img} src={upcoming} alt="" />
                            <h2 className={s.h2}>New</h2>
                        </div>
                        <div className={s.link}>
                            <img className={s.img} src={library} alt="" />
                            <h2 className={s.h2}>Library</h2>
                        </div>
                    </div>
                    <div className={s.pro}>
                        <h2 className={s.h2}>Join pro for free games.</h2>
                        <img className={s.imgController} src={controller} alt="" />
                    </div>
                </div>
                <div className={s.games}>
                    <div className={s.status}>
                        <h1 className={s.h1}>Active Games</h1>
                        <input className={s.input} type="text" />
                    </div>
                    <div class={s.cards}>
                        <div class={s.card}>
                            <img className={s.imgGame} src={assassins} alt="" />
                            <div className={s.cardInfo}>
                                <h2 className={s.h2Game}>Assassins Creed Valhalla</h2>
                                <p className={s.pGame}>PS5 Version</p>
                                <div className={s.progress}></div>
                            </div>
                            <h2 className={s.percentage}>60%</h2>
                        </div>
                        <div className={s.card}>
                            <img className={s.imgGame} src={sackboy} alt="" />
                            <div className={s.cardInfo}>
                                <h2 className={s.h2Game}>Sackboy A Great Advanture</h2>
                                <p className={s.pGame}>PS5 Version</p>
                                <div class={s.progress}></div>
                            </div>
                            <h2 className={s.percentage}>60%</h2>
                        </div>
                        <div className={s.card}>
                            <img className={s.imgGame} src={spiderman} alt="" />
                            <div className={s.cardInfo}>
                                <h2 className={s.h2Game}>Spiderman Miles Morales</h2>
                                <p className={s.pGame}>PS5 Version</p>
                                <div className={s.progress}></div>
                            </div>
                            <h2 className={s.percentage}>60%</h2>
                        </div>
                    </div>
                </div>
            </section>
        </main><div className={s.circle1}></div><div className={s.circle2}></div><div className={s.circle3}></div>
        </>
    )
}