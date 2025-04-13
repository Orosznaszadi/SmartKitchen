export default function About() {

    return(
    <div className="flex">

        <div className="flex-1 p-6  mx-auto space-y-12">

            <h1 className="text-3xl font-bold">Rólunk</h1>

            <p className="mb-4 text-lg leading-relaxed">
                Éttermünket azzal a céllal hoztuk létre, hogy vendégeinknek olyan gasztronómiai élményt nyújtsunk,
                amely ötvözi a <strong>hagyományos magyar konyha ízvilágát</strong> és a <strong>modern, egészségtudatos étkezés elveit</strong>.
            </p>
            <p className="mb-4 text-lg leading-relaxed">
                Hiszünk abban, hogy a minőségi étel alapja a <strong>kiváló alapanyag</strong>, ezért minden fogásunkat gondosan válogatott,
                friss és lehetőség szerint helyi termelőktől származó hozzávalókból készítjük.
            </p>
            <p className="mb-4 text-lg leading-relaxed">
                Kínálatunkban megtalálhatók:
            </p>
            <ul className="list-disc list-inside mb-4 text-lg">
                <li>klasszikus magyar fogások, mint a <em>paprikás csirke</em> vagy a <em>bakonyi sertésborda</em>,</li>
                <li>könnyedebb, egészségesebb alternatívák, például friss saláták és vegetáriánus ételek,</li>
                <li>házi készítésű desszertek, mint a <em>palacsinta</em> vagy a <em>somlói galuska</em>.</li>
            </ul>
            <p className="mb-4 text-lg leading-relaxed">
                Célunk, hogy minden vendégünk úgy érezze, mintha <strong>hazatért volna</strong> – akár egy kiadós vasárnapi ebédre,
                akár egy gyors, mégis ízletes hétköznapi ebédre érkezik hozzánk.
            </p>
            <p class="text-lg leading-relaxed">
                Üdvözlünk szeretettel a <strong>Smart Kitchen</strong> világában – ahol a hagyomány és innováció találkozik a tányérodon!
            </p>

        </div>
    </div>
    )
}
