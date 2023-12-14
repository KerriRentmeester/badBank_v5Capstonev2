function Login2(){
    // The web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional. measurementID is used when Google Analytics is enabled.
	var firebaseConfig = {
		// INPUT YOUR CONFIG HERE
	};
	// Initialize Firebase
    const app = initializeApp(firebaseConfig);
	// firebase.initializeApp(firebaseConfig);  // code from mod 26

    // get elements
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const login = document.getElementById('login');  
    const signup = document.getElementById('signup');
    const logout = document.getElementById('logout');

    // login
	login.addEventListener('click', e => {
		const auth  = firebase.auth();		
		const promise = auth.signInWithEmailAndPassword(email.value, password.value);
		promise.catch(e => console.log(e.message));
	});

	// signup
	signup.addEventListener('click', e => {
		// check for real email
		const auth  = firebase.auth();
		const promise = auth.createUserWithEmailAndPassword(email.value,password.value);
		promise.catch(e => console.log(e.message));
	});

    // logout
	logout.addEventListener('click', e => {
		firebase.auth().signOut();
	});

    // login state
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			console.log(firebaseUser);
			logout.style.display = 'inline';
			login.style.display  = 'none';
			signup.style.display = 'none';
		}
		else{
			console.log('User is not logged in');
			logout.style.display = 'none';			
			login.style.display  = 'inline';
			signup.style.display = 'inline';
		}
	});
}