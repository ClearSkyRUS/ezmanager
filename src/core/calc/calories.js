const calcalculate = (prot, fat, carb) => {
    var cal = prot * 4.1 + fat * 9.29 + carb * 4.1;
    return cal;
}

export default calcalculate;