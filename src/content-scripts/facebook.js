if (!window.injected) { // prevent double-injection
  window.injected = true;

  window.alert('injected!');
}
