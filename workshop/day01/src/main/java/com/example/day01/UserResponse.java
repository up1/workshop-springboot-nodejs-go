package com.example.day01;

public class UserResponse{
	private String name;
	private int id;
	private String email;
	private int age;

	public void setName(String name){
		this.name = name;
	}

	public String getName(){
		return name;
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
			"name = '" + name + '\'' + 
			",id = '" + id + '\'' + 
			",email = '" + email + '\'' + 
			",age = '" + age + '\'' + 
			"}";
		}
}
