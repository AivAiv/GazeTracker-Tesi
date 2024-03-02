<form action="#" method="POST" name="Register">
    <fieldset>
        <label>Email
            <input type="email" name="txtEmail" id="txtEmail" required/>
        </label>
        <label>Ripeti email
            <input type="email" name="txtEmailRepeat" id="txtEmailRepeat" required/>
        </label>
        <label>Password
            <input type="password" name="txtPassword" id="txtPassword" required/>
        </label>
        <fieldset>
            <legend>Tipo di utente</legend>
            <label>Creator
                <input type="radio" name="rdbUserType" id="rdbCreator" value="C" required/>
            </label>
            </label>Tester
                <input type="radio" name="rdbUserType" id="rdbTester" value="T" required/>
            </label>
        </fieldset>
    </fieldset>
    <input type="submit" name="btnRegister" value="Registrati"/>
</form>
<div>Hai già un account?</div>
<button id="btnSwitchToLogin">Login</button>