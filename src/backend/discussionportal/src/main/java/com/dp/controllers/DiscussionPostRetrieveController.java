package com.dp.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import org.springframework.stereotype.Controller;
import com.dp.beans.DiscussionPost;
import com.dp.beans.DiscussionPortalHandler;

@Controller
public class DiscussionPostRetrieveController {
	
	  @RequestMapping(method = RequestMethod.GET, value="/dicussions/alltopics")

	  @ResponseBody
	  public List<DiscussionPost> getAllDiscussionPosts() {
		  return DiscussionPortalHandler.getInstance().getDiscussionPostRecords();
	  }
	
}