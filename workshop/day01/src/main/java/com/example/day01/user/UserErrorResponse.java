package com.example.day01.user;

public class UserErrorResponse{
	private String message;

	public void setMessage(String message){
		this.message = message;
	}

	public String getMessage(){
		return message;
	}

	@Override
 	public String toString(){
		return 
			"UserErrorResponse{" + 
			"message = '" + message + '\'' + 
			"}";
		}
}
