<section class="base-container login">
    <form action="#" method="POST" name="Register">
        <h1>GazeTracker</h1>
        <label>&nbspEmail
            <input type="email" name="txtEmail" id="txtEmail" required autofocus/>
        </label>
        <label>&nbspPassword
            <input type="password" name="txtPassword" id="txtPassword" required/>
        </label>
        <label>&nbspRipeti password
            <input type="password" name="txtPasswordRepeat" id="txtPasswordRepeat" required/>
        </label>
        <label>&nbspTipo di utente
            <label>Creator
                <input type="radio" name="rdbUserType" id="rdbCreator" value="C" required/>
            </label>
            </label>Tester
                <input type="radio" name="rdbUserType" id="rdbTester" value="T" required/>
            </label>
        </label>
        <input type="submit" name="btnRegister" value="Registrati"/>
    </form>
    <section>
        <div>Hai già un account?</div>
        <button id="btnSwitchToLogin">Accedi</button>
    </section>
</section>