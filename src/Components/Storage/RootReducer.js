const intialstate = {
    cart:{},
    user:{}

};

export default function RootReducer(state = intialstate, action) {
  // alert(action)
  switch (action.type) {
    case "Add_Cart":
      state.cart[action.payload[0]] = action.payload[1];
      console.log(state.cart);
      return { cart: state.cart };

      // case "Delete_Employee":
      //    delete state.Employee[action.payload[0]]
      //   console.log(state.Employee);
      //   return { Employee: state.Employee };
        
      //   case "Edit_Employee":
      //       state.Employee[action.payload[0]] = action.payload[1];
      //       console.log(state.Employee);
      //       return { Employee: state.Employee }; 

    default:
      return state;
  }
}
