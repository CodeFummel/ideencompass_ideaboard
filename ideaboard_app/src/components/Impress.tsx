"use client"

import React from "react";
import {Button, Form} from "antd";



export const Impress = () => {


    return (
        <div>
            <header className={"flex flex-row gap-4 items-center  ml-4 mr-4 h-20"}>
            <h1 className={"text-[30px] font-bold text-center"}>Impressum</h1>
            <div className={"flex flex-1 justify-end h-full mt-11"}>
                <Button href={"/"} >Dashboard</Button>
            </div>
            </header>

            <br/>
            <br/>
            <div className={"flex-2  h-full border-2 rounded-(--border-radius) border-(--border) m-3 p-2"}>
                <p>Angaben gemäß § 5 Telemediengesetz (TMG) und § 18 Medienstaatsvertrag (MStV)
                    < br/>
                    < br/>
                    Diensteanbieter / Verantwortliche für den Inhalt:
                    < br/>
                    Justus Schindler
                    < br/>
                    Janusz Holubowski
                    < br/>
                    < br/>
                </p>
                <p className={"font-bold"}>
                    Kontakt:
                </p>
                <p>
                    < br/>
                    E-Mail: [justus.schindler@stud.helmholtz-Gymnasium.de]
                    < br/>
                    < br/>
                </p>
                <p className={"font-bold"}>
                    Art der Website
                </p>
                <p>

                    Bei dieser Website handelt es sich um ein nicht-kommerzielles Projekt.

                    < br/>
                    Es werden keine kostenpflichtigen Leistungen angeboten, keine Werbung geschaltet und keine Einnahmen
                    erzielt.
                    < br/>
                    < br/>
                </p>
                <p className={"font-bold"}>
                    Haftung für Inhalte
                </p>
                <p>


                    Die Inhalte unserer Seiten wurden mit größtmöglicher Sorgfalt erstellt.
                    < br/>
                    Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr
                    < br/>
                    übernehmen.
                    < br/>
                    < br/>
                    Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
                    allgemeinen Gesetzen verantwortlich.
                    < br/>
                    Nach §§ 8 bis 10 TMG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                    Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                    hinweisen.

                    < br/>
                    < br/>

                    Haftung für hochgeladene Inhalte

                    Nutzer haben die Möglichkeit, Inhalte und Daten auf dieser Website hochzuladen.
                    < br/>
                    Für diese Inhalte sind ausschließlich die jeweiligen Nutzer verantwortlich.
                    < br/>
                    Wir übernehmen keine Haftung für von Nutzern eingestellte Inhalte.
                    < br/>
                    < br/>
                </p>
                <p className={"font-bold"}>
                    Urheberrecht

                </p>
                <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem
                    deutschen
                    Urheberrecht.
                    < br/>
                    Beiträge Dritter sind als solche gekennzeichnet.
                    < br/>
                    Die Vervielfältigung, Bearbeitung, Verbreitung oder sonstige Nutzung außerhalb der Grenzen des
                    Urheberrechts bedarf der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                    < br/>
                    < br/>

                    Hinweis
                    < br/>

                    Der Zugriff auf bestimmte Bereiche der Website ist nur nach vorheriger Anmeldung möglich.
                </p>
            </div>
        </div>
    )


}