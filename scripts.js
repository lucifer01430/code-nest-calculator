    const display = document.getElementById("display");
    let memory = 0;
    let lastResult = null;

    function append(value) {
      if (display.innerText === "0" || display.innerText === "Error") {
        if (value === ".") display.innerText = "0.";
        else display.innerText = value;
      } else {
        // Prevent multiple decimals in a number
        if (value === ".") {
          let parts = display.innerText.split(/[^\d.]/);
          if (parts[parts.length - 1].includes(".")) return;
        }
        // Prevent two operators in a row
        if (/[+\-*/%]$/.test(display.innerText) && /[+\-*/%]/.test(value)) {
          display.innerText = display.innerText.slice(0, -1) + value;
          return;
        }
        display.innerText += value;
      }
    }

    function clearDisplay() {
      display.innerText = "0";
    }

      setTimeout(() => {
  console.log(
    "%c✨ Designed and Developed by Harsh Pandey",
    "color: #007bff; font-weight: bold; font-size: 16px;"
  );
  console.log(
    "%c🔗 https://lucifer01430.github.io/Portfolio/",
    "color: #28a745; font-size: 14px;"
  );
}, 2000);


    function backspace() {
      if (display.innerText.length === 1 || display.innerText === "Error") {
        display.innerText = "0";
      } else {
        display.innerText = display.innerText.slice(0, -1);
      }
    }

    function square() {
      try {
        display.innerText = Math.pow(eval(display.innerText), 2);
      } catch {
        display.innerText = "Error";
      }
    }

    function sqrt() {
      try {
        display.innerText = Math.sqrt(eval(display.innerText));
      } catch {
        display.innerText = "Error";
      }
    }

    function calculate() {
      let expr = display.innerText;
      try {
        // Replace % with /100 for percent, but only when used as a number postfix
        expr = expr.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');
        // Prevent eval on invalid expressions
        if (/[^0-9+\-*/().% ]/.test(expr)) throw new Error();
        let result = eval(expr);
        if (typeof result === "number" && !isNaN(result) && isFinite(result)) {
          display.innerText = result;
          lastResult = result;
        } else {
          display.innerText = "Error";
        }
      } catch (e) {
        display.innerText = "Error";
      }
    }

    // Memory functions
    function memoryClear() {
      memory = 0;
    }
    function memoryRecall() {
      if (display.innerText === "0" || display.innerText === "Error") display.innerText = memory.toString();
      else display.innerText += memory.toString();
    }
    function memoryAdd() {
      calculate();
      if (lastResult !== null) memory += Number(lastResult);
    }
    function memorySubtract() {
      calculate();
      if (lastResult !== null) memory -= Number(lastResult);
    }

    // Keyboard support
    document.addEventListener('keydown', function(e) {
      if (e.ctrlKey || e.metaKey) return;
      if (e.key >= '0' && e.key <= '9') append(e.key);
      else if (["+", "-", "*", "/", ".", "%", "(", ")"].includes(e.key)) append(e.key);
      else if (e.key === "Enter" || e.key === "=") calculate();
      else if (e.key === "Backspace") backspace();
      else if (e.key.toLowerCase() === "c") clearDisplay();
      else if (e.key.toLowerCase() === "r") memoryRecall();
      else if (e.key.toLowerCase() === "m") memoryAdd();
    });

    // Theme toggle
    const themeToggle = document.getElementById("themeToggle");
    function setTheme(dark) {
      if (dark) {
        document.body.classList.add("dark-mode");
        themeToggle.innerHTML = "☀️";
      } else {
        document.body.classList.remove("dark-mode");
        themeToggle.innerHTML = "🌙";
      }
    }
    // Initial theme
    let dark = false;
    setTheme(dark);
    themeToggle.addEventListener("click", () => {
      dark = !dark;
      setTheme(dark);
    });