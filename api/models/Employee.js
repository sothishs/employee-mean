/**
 * Employee.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  
      name:{
        type:"string",
        required:true,
        minLength: 2
      },      
      email:{
        type:"email",
        required:"true",
        unique: true
      },
      dob:{
        type:"string",
        required:true
      },
      department:{
        type:"string",
        required:true
      },
      gender:{
        type:"string",
        required:true
      },
      age:{
        type:"string",
        required:true
      }
  }
};

