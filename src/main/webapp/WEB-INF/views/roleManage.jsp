<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
%>
<div class="header">
	<button>添加</button>
	<button>删除</button>
</div>

<div class="role-manage">
	<table>
		<thead>
			<th>序号</th>
			<th>名称</th>
			<th>描述</th>
			<th>创建时间</th>
			<th>操作</th>
		</thead>
		<tbody>
			<!-- varStatus获取当前索引或序号 -->
			<c:forEach var="item" items="${pageBean.list }" varStatus="status">
				<tr class="role-content-item" data-id="${item.id }">
					<!-- count获取当前序号，从1开始 -->
					<!-- index获取当前索引，从0开始 -->
					<td><input type="checkbox" name="checkbox" value="${item.id }" data-id="${item.id }">
						${item.id }</td>				
					<td>${item.name }</td>
					<td>${item.description }</td>
					<td>${item.createTime }</td>
					<td><a href="toRole" data-id="${item.id }">编辑</a>
					 <a href="deleteRole" data-id="${item.id }">删除</a></td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
	<div class="footer">
		<font size="3">共<font color="red">${pageBean.totalPage }</font>页
		</font>&nbsp;&nbsp; <font size="3">共<font color="red">${pageBean.allRows }</font>条记录
		</font><br>

		<c:choose>
			<c:when test="${pageBean.currentPage == 1}">
			 首页&nbsp;&nbsp;&nbsp;上一页
			</c:when>
			<c:otherwise>
				<a href="findAllRole">首页</a>
            &nbsp;&nbsp;&nbsp;
            <a href="findAllRole"
					data-page="${pageBean.currentPage - 1 }">上一页</a>
			</c:otherwise>
		</c:choose>

		<c:choose>
			<c:when test="${pageBean.currentPage != pageBean.totalPage }">
				<a href="findAllRole" data-page="${pageBean.currentPage + 1 }">下一页</a>
            &nbsp;&nbsp;&nbsp;
            <a href="findAllRole" data-page="${pageBean.totalPage }">尾页</a>
			</c:when>
			<c:otherwise>
			下一页&nbsp;&nbsp;&nbsp;尾页
			</c:otherwise>
		</c:choose>
	</div>
</div>
<script type="text/javascript">
var manageRef="toRole";
var deleteInfo="deleteRole";
var findAllInfo="findAllRole";
var $mangeClass=$rightContent.find(".role-manage");
</script>
<!-- 引入外部脚本 -->
<script src="<%=path%>/js/common.js"></script>