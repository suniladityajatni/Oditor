// export const customStyles = {
//     control: (styles) => ({
//       ...styles,
//       width: "100%",
//       maxWidth: "14rem",
//       minWidth: "12rem",
//       borderRadius: "5px",
//       color: "#000",
//       fontSize: "0.8rem",
//       lineHeight: "1.75rem",
//       backgroundColor: "#FFFFFF",
//       cursor: "pointer",
//       border: "2px solid #000000",
//       boxShadow: "5px 5px 0px 0px rgba(0,0,0);",
//       ":hover": {
//         border: "2px solid #000000",
//         boxShadow: "none",
//       },
//     }),
//     option: (styles) => {
//       return {
//         ...styles,
//         color: "#000",
//         fontSize: "0.8rem",
//         lineHeight: "1.75rem",
//         width: "100%",
//         background: "#fff",
//         ":hover": {
//           backgroundColor: "rgb(243 244 246)",
//           color: "#000",
//           cursor: "pointer",
//         },
//       };
//     },
//     menu: (styles) => {
//       return {
//         ...styles,
//         backgroundColor: "#fff",
//         maxWidth: "14rem",
//         border: "2px solid #000000",
//         borderRadius: "5px",
//         boxShadow: "5px 5px 0px 0px rgba(0,0,0);",
//       };
//     },
  
//     placeholder: (defaultStyles) => {
//       return {
//         ...defaultStyles,
//         color: "#000",
//         fontSize: "0.8rem",
//         lineHeight: "1.75rem",
//       };
//     },
//   };



export  const customStyles = {
    option: (provided, state) => ({
      // ...provided,
      backgroundColor:"#5f99be",
      // borderBottom: '1px dotted pink',
      // color: state.isSelected ? 'red' : 'blue',
      // padding: 20,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      
      backgroundColor:"#5f99be",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided };
    }
  }