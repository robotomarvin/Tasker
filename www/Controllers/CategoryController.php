<?php

namespace Controllers;

use Controllers\ApplicationController;
use Models\User;
use Models\UserQuery;
use Models\Note;
use Models\NoteQuery;
use Models\Category;
use Models\CategoryQuery;
use Models\Comment;
use Models\CommentQuery;
use Models\Shared;
use Models\SharedQuery;
use Models\UserGroup;
use Models\UserGroupQuery;
use Models\Group;
use Models\GroupQuery;
use Propel\Runtime\Collection\Collection;
use Propel\Runtime\Exception\PropelException;

class CategoryController extends ApplicationController{

	public function __construct(){
		parent::__construct();
	}

	protected function remove($id){
		$category = CategoryQuery::create()->
				filterByUser($this->params['user'])->
				filterById($id)->
				findOne();
		if($category){
			NoteQuery::create()->filterByCategory($category)->delete();
			$category->delete();
			$this->addFlash("success", t('.category_removed'));
		}
		else{
			$this->addFlash("error", t('common.not_found'));
		}
		redirectBack();
	}

	protected function add(){
		if(empty($_POST['id'])){
			$category = new Category();
			$category->setUser($this->params['user']);			
		}
		else{
			$category = CategoryQuery::create()->
				filterByUser($this->params['user'])->
				filterById($_POST['id'])->
				findOne();
		}
		$category->setName($_POST['category_name']);
		$category->setColor($_POST['category_color']);
		$success = false;
		$errors = array();
		try {
			$success = $category->save();
		} catch (PropelException $e) {
			if($e->getPrevious()->getCode() == 23000){
				array_push($errors, ['path' => 'name', 'message' => t('models.category.validation.name.uniq')]);
			}
			else{
				throw $e;
			}			
		}
		if($success){
			$this->addFlash("success", t('.category_added'));
			$this->renderString(json_encode(['redirect'=>$_SERVER['HTTP_REFERER']]));
		}
		else{
			$errors = array_merge($errors, $category->getValidationFailuresI18n());
			$this->renderString(json_encode($errors));
		}
	}
}