package com.qingshixun.project.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
@Table(name = "t_user")
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // id递增
	private Integer id;
	private String userName; // 用户名
	private String password; // 用户密码

	// 再次输入登录密码
	@Transient // 不作为数据库持久化字段
	private String passwordAgain;
	private String name; // 用户姓名
	
	private String phoneNumber; //手机号码
	// 用户性别(不可以为空)
	@Column(nullable = false)
	@Enumerated(EnumType.ORDINAL)
	private Gender gender = Gender.male;

	// 用户状态(不可以为空)
	@Column(nullable = false)
	@Enumerated(EnumType.ORDINAL)
	private Status status = Status.enable;

	@Temporal(TemporalType.DATE)
	private Date createTime;
	
	@ManyToOne(targetEntity=Role.class,fetch=FetchType.EAGER) 
	@Cascade(CascadeType.SAVE_UPDATE) //设定级联关系
	private Role role;
	
	@ManyToOne(targetEntity=Department.class,fetch=FetchType.EAGER)
	@Cascade(CascadeType.SAVE_UPDATE)
	private Department department;
	// 性别(枚举值)
	public enum Gender {
		male, female;
	}

	// 状态(枚举值)
	public enum Status {
		enable, disable;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPasswordAgain() {
		return passwordAgain;
	}

	public void setPasswordAgain(String passwordAgain) {
		this.passwordAgain = passwordAgain;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	@Override
	public String toString() {
		return "Account [id=" + id + ", userName=" + userName + ", password=" + password + ", passwordAgain="
				+ passwordAgain + ", name=" + name + ", phoneNumber=" + phoneNumber + ", gender=" + gender + ", status="
				+ status + ", createTime=" + createTime + "]";
	}
	
	
}
