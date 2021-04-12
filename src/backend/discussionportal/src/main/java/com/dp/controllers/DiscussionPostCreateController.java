package com.dp.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.dp.beans.*;

@Controller
public class DiscussionPostCreateController {

	  @RequestMapping(method = RequestMethod.POST, value="/dicussions/add")
	  
	  @ResponseBody
	  public DiscussionPost registerStudent(@RequestBody DiscussionPost discussionPost) {
		  DiscussionPortalHandler.getInstance().addDiscussionPost(discussionPost);
		  return discussionPost;
	  }
}
