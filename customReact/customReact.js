function customRender(reactElement, container) {
    const domElement = document.createElement(reactElement.type);
    domElement.textContent = reactElement.props.children;
  
  //  domElement.setAttribute("href", reactElement.props.href);
  //  domElement.setAttribute("target", reactElement.props.target);
      
  for (const prop in reactElement.props) {
        if (prop !== "children") {
            domElement.setAttribute(prop, reactElement.props[prop]);
        }
    }

    container.appendChild(domElement);
}


const reactElement = {
    type: "a",
    props: {
        href: "https://www.google.com",
        target: "_blank",
        children: "Click HERE to use Google"
    }
}


const mainContainer = document.getElementById("root");


// Now We need A function to Render our 
// reactElement to the DOM in root id

customRender(reactElement, mainContainer);