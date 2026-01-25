<script>
  const handleGoogleLogin = () => {
    // Redirect to backend Google auth
    window.location.href = 'http://localhost:3000/auth/google';
  };
</script>

<div class="login-container">
  <h1>Login</h1>
  <button on:click={handleGoogleLogin}>
    Sign in with Google
  </button>
</div>

<style>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  
  button {
    padding: 12px 24px;
    font-size: 16px;
    cursor: pointer;
  }
</style>