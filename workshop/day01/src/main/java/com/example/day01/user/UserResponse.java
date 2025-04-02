package com.example.day01.user;

public class UserResponse{

	private int id;
	private String first_name;
	private String email;
	private int age;

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public void setId(int id){
		this.id = id;
	}

	public int getId(){
		return id;
	}

	public void setEmail(String email){
		this.email = email;
	}

	public String getEmail(){
		return email;
	}

	public void setAge(int age){
		this.age = age;
	}

	public int getAge(){
		return age;
	}

	@Override
 	public String toString(){
		return 
			"UserResponse{" + 
			",id = '" + id + '\'' +
			",email = '" + email + '\'' + 
			",age = '" + age + '\'' + 
			"}";
		}
}
