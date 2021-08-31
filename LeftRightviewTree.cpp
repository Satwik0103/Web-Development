#include<bits/stdc++.h>
using namespace std;
struct node{
	int data;
	struct node*left;
	struct node*right;
	node(int val){
		data=val;
		left=NULL;
		right=NULL;
	}
};


void leftview(struct node*root){
	if(root==NULL){
		return;
	}
	queue<node*>q;
	q.push(root);
	while(!q.empty()){
		int n=q.size();
		
		for(int i=1;i<=n;i++){
			node*curr2=q.front();
			q.pop();
			if(i==1)
				cout<<curr2->data<<" ";
			if(curr2->left!=NULL)
				q.push(curr2->left);
			if(curr2->right!=NULL)
				q.push(curr2->right);
		}
	}
}


void rightview(struct node*root){
	if(root==NULL){
		return;
	}
	queue<node*>q;
	q.push(root);
	while(!q.empty()){
		int n=q.size();
		for(int i=0;i<n;i++){
			node*curr=q.front();
			q.pop();
			if(i==n-1)
				cout<<curr->data<<" ";
		if(curr->left!=NULL){
			q.push(curr->left);
		}
		if(curr->right!=NULL){
			q.push(curr->right);
		}
	}
	}

}
int main(){
	struct node*root;
	root=new node(1);
	root->left=new node(2);
	root->right=new node(3);
	root->left->left=new node(4);
	root->left->right=new node(5);
	root->right->left=new node(6);
	root->right->right=new node(7);
	rightview(root);
	cout<<endl;
	leftview(root);
	cout<<endl;
//	topview(root);
	return 0;
}