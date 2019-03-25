  const calculateParams = (id, hot, cold, ganes, gramm, param, products) => {
    var result = 0;
      (ganes)
      ? (result= ((gramm/(products.find(x => x._id === id).ganes/100)) * param))
      : (result= (gramm
                + (gramm+ gramm * products.find(x => x._id === id ).hot/100 * hot) * products.find(x => x._id === id ).cold/100 * cold
                + gramm * products.find(x => x._id === id ).hot/100 * hot)*param)

      return result;
 }

 export default calculateParams;