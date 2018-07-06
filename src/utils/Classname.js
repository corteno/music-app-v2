const Classname = (classes) => {
    let classNames = '';

    if(typeof classes === 'object'){
        for (let property in classes) {
            if (classes.hasOwnProperty(property)) {
                //If the property's value is true then add that property to the classNames
                if(classes[property] === true){
                    classNames += `${property} `;
                }
            }
        }

        return classNames;
    } else {
        return this.props.className;
    }
};

export default Classname;