<section class="base-container access register">
    <form action="#" method="POST" name="Register">
        <h1>GazeTracker</h1>
        <label>&nbspEmail
            <input type="email" name="txtEmail" id="txtEmail" placeholder="Inserisci la tua email" required autofocus/>
        </label>
        <label>&nbspPassword
            <input type="password" name="txtPassword" id="txtPassword" placeholder="Inserisci la tua password" required/>
        </label>
        <label>&nbspRipeti password
            <input type="password" name="txtPasswordRepeat" id="txtPasswordRepeat" placeholder="Ripeti la tua password" required/>
        </label>
        <b>Sei un tester o un creator?</b>
        <section>
            <label>Creator
                <input type="radio" name="rdbUserType" id="rdbCreator" value="C" required/>
            </label>
            <div class="separator"></div>
            <label>Tester
                <input type="radio" name="rdbUserType" id="rdbTester" value="T" required/>
            </label>
        </section>
        <input type="submit" name="btnRegister" value="Registrati"/>
    </form>
    <section>
        <div>Hai già un account?</div>
        <button id="btnSwitchToLogin">Accedi</button>
    </section>
</section>