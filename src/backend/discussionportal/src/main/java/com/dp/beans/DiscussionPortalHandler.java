package com.dp.beans;

import java.util.ArrayList;
import java.util.List;

public class DiscussionPortalHandler {

    private List<DiscussionPost> discussionPostRecords;

    private static DiscussionPortalHandler handler = null;
    
    private DiscussionPortalHandler(){
    	discussionPostRecords = new ArrayList<DiscussionPost>();
    }
    
    public static DiscussionPortalHandler getInstance() {

        if(handler == null) {
        	handler = new DiscussionPortalHandler();
              return handler;
            }
            else {
                return handler;
            }
    }
    
    public List<DiscussionPost> getDiscussionPostRecords() {
    	return discussionPostRecords;
    }
    
    public void addDiscussionPost(DiscussionPost discussionPost) {
    	discussionPostRecords.add(discussionPost);
    }
}
