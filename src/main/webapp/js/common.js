$(function(){
	/**
	**manage.jsp begin
	*/
	var $table = $rightContent.find("table");
	//同一行上删除当前选中账户
	var $operator = $table.find("tbody").find("tr");
	/**
	 * 实现全选功能
	 */
	$table.find("thead").find("th:first").on("click", function() {
		// 获取列表中所有的checkbox
		var checkboxItems = $table.find("input[name='checkbox']");

		// 获取列表中选中的checkBox
		var checkedboxItems = $table.find("input[name='checkbox']:checked");

		// 如果两个列表的数量相等，表示所有的checkbox都被选中，则反选
		// 反之，则全选
		var isChecked = checkboxItems.length === checkedboxItems.length;

		// 去两个列表长度判断的反值
		checkboxItems.prop("checked", !isChecked);
	});
	/**
	 * 选中一行就可以选中复选框，除了第一个和最后一个td
	 */
	$table.find("tbody").find("tr td:not(:first-child,:last-child)").on(
			"click", function() {
				var $this = $(this).parent();
				var nowItem = $this.find("input[name='checkbox']");
				// 获取当前行CheckBox的状态值
				var isChecked = nowItem.prop("checked");

				// 最新的状态值只需要与当前状态值相反即可
				nowItem.prop("checked", !isChecked);
			});

	/**
	 * 实现添加账户
	 */
	$rightContent.find(".header").find("button:first").on("click", function() {
		$rightContent.load(manageRef);
	});
	/**
	 * 根据复选框选中的状态删除用户
	 */
	$rightContent.find(".header").find("button:last").on("click", function() {
		var ckbs = $operator.find("input[name='checkbox']:checked");
		
		var arrayId = new Array();
		if (ckbs.size() == 0) {
			alert("要删除指定行，需选中要删除的行！");
			return;
		} else {
			if (confirm("确定要删除选中项？")) {

				/* ckbs.parent().parent().hide(); */
				ckbs.each(function(i) {
					arrayId[i] = $(this).data("id")

					/*
					 * $rightContent.load("deleteAccount", { "account.id" :
					 * arrayId[i] });
					 */

					$.ajax({
						cache : true,
						type : "POST",
						url : deleteInfo,
						data : {
							id : arrayId[i]
						},
						async : false,
						error : function(request) {
							alert("Connection error");
						},
						success : function(data) {
							$rightContent.load(findAllInfo);
							
						}
					});
				});
				console.log(arrayId);

			}

		}
	});
	
	//同一行上删除当前选中账户
	$table.find("tbody").find("tr:odd").css("background-color", "#F0F0F0");
	$operator.find("a:last").on("click", function(e) {
		var $this = $(this);
		
		//阻止a标签原有的默认事件
		e.preventDefault();

		var ckbs = $operator.find("input[name='checkbox']:checked");
		var id=$this.data("id");
		var trId = ckbs.parent().parent().data("id");
		console.log("id:" + id);
		console.log("trId:" + trId);
		//得到a标签href属性的值
		var pageRef = $this.prop("href");
		console.log(pageRef);
		console.log("ckbsValue:" + ckbs.val());
		if(trId!=id){
			alert("要删除指定行，需要选中当前的复选框！");
			return;
		} else {
			if (confirm("确定要删除选中项？")) {
				
				/**
				实现异步刷新，
				**/
				$.ajax({
			        cache: true,
			        type: "POST",
			        url:pageRef,
			        data:{
			        	id : id
			        },
			        async: true,
			        error: function(request) {
			            alert("Connection error");
			        },
			        success: function(data) {
			        	$rightContent.load(findAllInfo);
			        }
			    });
			}
		}
	});
	

	

	//编辑该账户
	//同一行上编辑当前选中账户
	
	$operator.find("a:first").on("click", function(e) {
		var $this = $(this);
		
		//阻止a标签原有的默认事件
		e.preventDefault();

		var ckbs = $operator.find("input[name='checkbox']:checked");
		var id=$this.data("id");
		var trId = ckbs.parent().parent().data("id");
		console.log("id:" + id);
		console.log("trId:" + trId);
		//得到a标签href属性的值
		var pageRef = $this.prop("href");
		console.log(pageRef);
		console.log("ckbsValue:" + ckbs.val());
		if(trId!=id){
			alert("要编辑指定行，需要选中当前的复选框！");
			return;
		} else {
			if (confirm("确定要编辑选中项？")) {
				/* ckbs.parent().parent().remove(); */
				$rightContent.load(pageRef, {
					//左边是Action里的值，右边是js定义的变量
					id: id
				});
			}
		}
	});
	/**
	实现分页（超链接跳转功能）模块
	**/
	$mangeClass.find(".footer").find("a").on(
			"click", function(e) {
				
				var $this = $(this);
				var mythis=$(this);
				
				var page = $this.data("page");

				console.log(page);
				//阻止a标签原有的默认事件
				e.preventDefault();
				//得到a标签href属性的值
				/* var pageRef = $this.prop("href"); */
				var pageRef=findAllInfo;
				$rightContent.load(pageRef, {
					page : page
				});

			});
	
	/**
	**XXmanage.jsp end
	*/

	/**
	**add_XX.jsp begin
	*/
	
	$rightContent.find(".button-group").find("button:last").on("click",function(){
		var $form=$content.find("form");
		/* $form.submit(); */
		/*  $form.on("submit",function(e){
			//阻止原标签原有的默认事件
			 e.preventDefault();
			 //得到a标签href属性的值
	         var pageRef=$(this).prop("action");
	         //JQuery load页面
	         $rightContent.load(pageRef);
		}).submit();  */
		alert("load success");
		$.ajax({
	        cache: true,
	        type: "POST",
	        url:$form.prop("action"),
	        data:$form.serialize(),// 你的formid
	        async: false,
	        error: function(request) {
	            alert("Connection error");
	        },
	        success: function(data) {
	        	$rightContent.load(findAllInfo);
	        }
	    });
	});
	
	/**
	**add_XX.jsp end
	*/
	
});