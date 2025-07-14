
######################################################################################

export DISPLAY=:1    # enable gedit for normal user

##############################################################################################
########################################     Aliases     #####################################
##############################################################################################



###################################### System One Time Configuration ###################################################

: '
  only once is enough

    shopt -s globstar  ## to enable globstar  useful ** in for file matching
    shopt  globstar    ## to see globstar is enabled or not 
    shopt -u globstar  ## to disable globstar   
'

###################################### System ###################################################

shopt -s globstar  ## to enable globstar

alias Ls="sudo su"
alias gedit="gnome-text-editor"  # now gedit is replaced by gnome-text-editor

alias a=" alias"
alias ob="gedit /etc/bash.bashrc" ## open bash  " notepad ~/.bashrc"    ##  "open -t ~/.zshrc" in mac  -t -> defaut text editor
alias eb="gedit /etc/bash.bashrc" ## edit bash
alias ea="gedit /etc/bash.bashrc" ## edit alias
alias cls=" clear"
alias cf="gedit " # + file name  ## create file
alias of="gedit " # + file name	 ## open file
alias af="gedit about.txt" # about file

alias cpf="xclip -sel clip < "   # copy file content to clip




###################################### Ports & PID ###################################################

## --------------------to see ports ...below commands needs corresponding access----so login is required

alias ports-listen="lsof -i -P -n | grep LISTEN" # to see listening ports
alias p-l="lsof -i -P -n | grep LISTEN" # to see listening ports
alias ports-all="lsof -i -P -n" # to see all running process
alias ports-search="lsof -i -P -n | grep " # port no     ## to search particular port no and PID
		##   lsof -i:portNo     <-- this also we can use to see port info
		
alias p-s="lsof -i -P -n | grep " # port no     ## to search particular port no and PID


alias kill-process="kill " # PID
alias kill-process-force="kill -9 " # PID
alias k-p-f="kill -9 " # PID


###################################### git ###################################################


: '

			*** is important command

below some more comments are exist

'


alias g="git"
alias gac="git add -A && git commit -a -m " # + commit message	##					***
alias gacm="git add -A && git commit -a -m " # + commit message
alias gi="git init "
alias gic="gi && gac " # git init and commit

alias gcl=" git clone " # + url					##					***
alias gs=" git status " 					##					***
alias glg="git log"						##					***
alias glgg="git log --graph"					##					***

alias gst="git add -A && git stash push -m " # + stash message  # "git add -A && git stash"  ***
alias gstp="git stash pop"    #      ***
alias gsta="git stash apply"  #      ***
alias gstl="git stash list"   #      ***
alias gstc="git stash clear"  #      ***





##-------------remote related

alias gr="git remote " #
alias gra="git remote add " # name + url
alias grao="git remote add origin " # + url

alias grso="git remote set-url origin " # +url   , to change/set url
alias grsu="git remote set-url " # remoteName url
alias grv="git remote -v " # to see origin url
alias grrmo="git remote rm origin "  # instead of origin we can give any name 
alias grro="git remote rm origin "  # instead of origin we can give any name 

##-------------the same above alias    r--> rt   ( rt =remote  ) rm= remove

alias grt="git remote " #
alias grta="git remote add " # name + url
alias grtao="git remote add origin " # + url

alias grtso="git remote set-url origin " # +url   , to change/set url
alias grtsu="git remote set-url " # remoteName url

alias grtv="git remote -v " # to see origin url
alias grts="git remote -v " # to see origin url   # s = see


alias grtrmo="git remote rm origin "  # instead of origin we can give any name    ## r= remove // rm= remove
alias grtro="git remote rm origin "  # instead of origin we can give any name 
alias grtrm="git remote rm origin "  # instead of origin we can give any name 
alias grtr="git remote rm origin "  # instead of origin we can give any name 

alias gp="git push " # + remote  branch name
alias gpo="git push origin" # branch name			##					***
alias gpom=" git push origin master "

alias gpr="git push -u " # remoteName branchName							***
alias gpu="git push -u " # remoteName branchName

## force push
alias gP="git push -f " # + remote  branch name
alias gPo="git push -f --all origin" # branch name		
alias gPom="git push -f --all origin master "

: '
 all forced action related char should be in upper case
  eg: gP
'

alias gpf="git push -f " # + remote  branch name
alias gpof="git push -f --all origin" # branch name		
alias gpomf="git push -f --all origin master "


alias gl=" git pull " # + remote  branch name
alias glo="git pull origin" # branch name			##					***
alias glom=" git pull origin master "

alias gf="git fetch " # remote branch name
alias gfo="git fetch origin " #  branch name
alias gfom="git fetch origin master "




## branch 
alias gbl=" git branch " # , to see local branches		##					***
alias gbr=" git branch -a " # , to see remote branches		##					***
alias gb="git branch"
alias gob="git ls-remote -h origin"


## branch actions
alias gb=" git branch " # +  branch name 	## to create branch
alias gc="git checkout" # + branch name		## to checkout	##					***
alias gcb=" git checkout -b " # + branch name	## it'll create new branch and do checkout

## to pull particular commit in new branch 
alias gcbc="git checkout -b " # +branch name + commit id
alias gpc="git checkout -b particular-commit " #  +commit id   ## it'll create 'particular-commit' branch with given commit
								##					***
alias goc="git checkout -b old-commit "	#  +commit id 		##					***

: '
		 git checkout -b new-branch commit_id
		( it will create a new branch with name new-branch  with the code till the commit commit_id)

			or
		git checkout -b new-branch
		git merge commit_id
		
'


alias gm="git merge" # + branch name				##					***
alias gmXt="git merge -Xtheirs " # +branchname (i.e if conflicts exists, accept theirs/upstream changes) ***
alias gmXo="git merge -Xours " # +branchname  ( i.e if conflicts exists, accept ours/downstream changes) ***

alias gms=" git merge --squash " # branch name 
## squash merge won't add all feature branch commits, rather it'll force us to do a single merge commit ( only single commit )

: '
   -Xours / -Xtheirs is opposite in git rebase case
    git rebase -Xours  branchName    ...then if conflicts are there...ignore ours

  ref https://demisx.github.io/git/rebase/2015/07/02/git-rebase-keep-my-branch-changes.html
'

##  ( allowing unrelated histories )
alias gmf="git merge --allow-unrelated-histories " # + branch name

: '
	## to merge remote branch
	git merge remotes/origin/branchName      or gm remotes/origin/branchName
'


: '
  Revert , Reset, Rebase
    https://opensource.com/article/18/6/git-reset-revert-rebase-commands
'

alias gcp="git cherry-pick" # commit ids

alias gu="git reset HEAD -- ." # unstaging all files
alias gua="git reset HEAD -- ." # unstaging all files
alias guf="git reset HEAD -- " # path to file

## rebase

alias grb="git rebase" # + branch name
alias grbm="git rebase master" 

alias grbo="git pull --rebase origin" #+ branch name
alias grbom="git pull --rebase origin master" 

alias glrbo="git pull --rebase origin" #+ branch name
alias glrbom="git pull --rebase origin master" 

alias grbXo="git rebase -Xours " #+branchName  ( i.e if conflicts are there ignore ours...accept theirs) ***
alias grbXt="git rebase -Xtheirs " #+branchName  ( i.e if conflicts are there ingore theirs )		***

: '
    -Xours / -Xtheirs is opposite in git merge case
    git merge -Xtheirs  branchName    ...then if conflicts are there...accept theirs
'

## delete branch

alias gbd="git branch -d" # + branch name  , it works only if it is merged with master #		***
alias gbD="git branch -D" # + branch name  , delete forcefully	##					***
alias gpdo="git push -d origin" # branch name  , to delete remote(origin) branch


alias gdb="git branch -d" # + branch name  , it works only if it is merged with master
alias gDb="git branch -D" # + branch name  , delete forcefully
alias gdob="git push -d origin" # branch name  , to delete remote(origin) branch


alias gbdl="git branch -d" # + local branch name  , it works only if it is merged with master
alias gbdr="git branch -d" # + remote branch name  , to delete remote(origin) branch
alias gbdo="git branch -d" # + origin branch name  , to delete remote(origin) branch



## ----------------------------------- tags---------------------------------
: '
  tags are reference point to particular commit--> generally used to maintain releases
  tag also refernce to commit, so we can do all action what we can do with commits
   like : creating braches, pushing tags, deleting tags
   
'
## creation / list
alias gt="git tag " ## to list all tags  or ## + tag-name to create
 ## to create tag 'git tag tag-name'   use the above alias

: '

-----------------------------------to create annotated tag with message-----------------------------
  $ git tag v.1.1 -a -m "relaese version v.1.1
    // annotaged tag will be stored as a seperate object and it will contain extran info

--------------------------------to search tag with wild cards
   $ git tag -l "name.*"


'
## info
alias gts="git show " ## + tag name ---to see all tag info

## pushing
alias gtp="git push origin " ## tag-name   to push to remote
alias gtpa="git tag push origin --all" ## to push all trags

## delete --> same as branch
alias gtd="git tag -d " # +tag-name  // if more than one comma(,) seperated
alias gtdr=" git push origin -d " # +tag-name

## checkout tag as a branch
alias gtb=" git checkout -b " ## + branch-name + tag-name

## to create tag at particular commit
alias gtc=" git tag " ## tag-name + commitId  



## remove files

# from repo and file system
alias grm="git rm" # + file_name    or  -r folder_name
alias grma=" git rm -r *" # remove all
alias grmA="grma && grma" # removes even hidden and only extension files/folders
alias grmfl="git rm" # +file name  , folder/t.txt
alias grmfo="git rm -r" # +folder name


# from repo not from file system
alias grmc="git rm --cached" # file_name    or  -r folder_name
alias grmcfl="git rm -c" # +file name  , folder/t.txt
alias grmcfo="git rm -r --cached" # +folder name


## git clean , deleting all untracked files/changes
alias gclean="git clean -f"

## git reset ,unstage all changes that have been added to stage area ( stage= state after adding and before commit)
alias greset="git reset ."


## resetting to other branch		( *** if dont't give branch ...it'll reset to current branch)
alias grs="git reset " # + branchName  // the current branch will be reset to the given branch		***
alias gRs="git reset --hard " # + branchName // hard reset ...if conflicts are there			***
 ## this we can use it for revert git pull   ...usefull if merge conflicts are coming...when we pull
alias grsh="git reset --hard " # + branchName // hard reset ...if conflicts are there

## git reset --hard commitId   -> will reset head to particular commit ( revert the code )		***




## not to add specific files or folders
alias gar="git add -A && git reset --" # + file_name    or  -r folder_name

## config

alias gcgun="git config --global user.name" # + name
alias gcgue="git config --global user.email" # + email
alias gcls="git config --list"

alias gcun="git config  user.name" # + name
alias gcue="git config  user.email" # + email

## to open config files--- config 'C'  capital c

alias gCg="git config --global -e" # global config files  
alias gCs="git config --system -e" # system config files
alias gCl="git config --local -e"	# local config files




## to see files
alias ls="ls"
alias lsb="git ls-tree -r" # +branch name
alias lsh="git ls-tree -r head" # list current head(branch)


## to see diff between files
alias gd="git diff" # + br-1:f.txt br-2:f.txt or  commit1Id:f.txt commit2Id:f.txt


## SSH Key
alias gssh="ssh-keygen" # generate ssh-key
alias sssh="cat ~/.ssh/*.pub" # show ssh
alias ossh="gedit ~/.ssh/*.pub" # open ssh
alias cssh="xclip -sel clip < ~/.ssh/*.pub" # copy ssh // xclip should be installed
alias vsshgh="ssh -T git@github.com" # verify ssh with git-hub
alias vsshgl="ssh -T git@gitlab.com" # verify ssh with git-lab

: '
 ssh files will stored in home folder of the user by default   
   eg; if user is root
    identification file in  /root/.ssh/id_rsa.
    public key in 	/root/.ssh/id_rsa.pub.
'


## to terminate another processing bash
alias gterm="rm -f .git/index.lock"
alias grml="rm -f .git/index.lock"   # remove lock



##  to enable auto-complete
: '
curl https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash -o ~/.git-completion.bash

this will install scrpt file in root directory
'
 if [ -f ~/.git-completion.bash ]; then
  . ~/.git-completion.bash
fi


####################################### git advance ###########################################

: '
----------------------------------
  setting current shell variables and using
 
eg 1)  	gc="git checkout"
  	$gc master
  	
eg 2)  	name="Ravinder"
	 echo $name
 '
: '

----------------------------------------------------------------------------------------------------------
---------------------------------------------git comments------------------------------------------------
----------------------------------------------------------------------------------------------------------
  

--------------------------------  to pull till particular commit-------------------------------

git pull=git fetch + git merge ( merges the latest comment ) 

# to pull particular commit --> fetch the branch, but merge till the particular commit

git fetch origin branch-1
git merge commit_id

( do this in new branch ) 

# tip:- create a new branch --> then fetch the source branch --> then merge the required commit 
	( if you want that commit code back to source branch, merge the new branch back to source )
	( do this all in local )

# tip:-  todo the same above tip short cut 
		-> git checkout -b new-branch commit_id
		( it will create a new branch with name new-branch  with the code till the commit commit_id)


---------------------------------------- references -----------------------------------------------

---------to undo changes
ref https://git-scm.com/book/en/v2/Git-Tools-Advanced-Merging#_undoing_merges


----------------------------------------------------------------------------------------------------------
---------------------------------------------other comments------------------------------------------------
----------------------------------------------------------------------------------------------------------

---------------------------------------------- to quit vim editor ---------------------------------------------------
ESC   then     :    then    q!
  

 
'
: '



----------------------------------    Treacking & Untracking --------------

  # fileName  - file or directory
 git add fileName   # adds file to tracking ( and staging also)
 git rm --cahed  fileName  # makes untrack    

 ---------------------  to skip one from tracking --------------
 git add -A 
 git rm --cahed  fileName  # makes untrack 

 ----------------------------------    Staging & Unstaging --------------
  # only tracked files ...will be staged

 git add fileName   # adds file to tracking ( and staging also)
 git reset HEAD -- fileName  # unstage

------------------   skip one file from commt -------

git add -u  # add only updated files to statging    *****
git reset -- main/dontcheckmein.txt
git commit -m "message"

-------------- to change last commit message ---------

git commit --amend -m "Put your corrected message here"



'

: '

  git pull=git fetch + git merge
  git merge feature master =git checkout feature & git merge master

'


: '  ------------------untacking tracked files(folders)------------------------
   to ignore already tracked files ( untracking the tracked files )
   note: once if a file is tracked ....git ignore will not ignore that file ...untill we untrack it
   to do that  

		git rm -c  fileName    // alias grmcfl +fileName
		git rm -r -c  folderName    // alias grmcfo +fileName



  ------------------removing commint history of a file(folder)-----------------

     1) remove in local hisory by rewritting
	git filter-branch --index-filter "git rm -rf --cached --ignore-unmatch file" HEAD    ##  HEAD=current branch  it works for both file and folder


	(
	Note: when we rewrite it will take backup for that branch...so if already backup exists...it will not allow to rewrite
		... in that case remove the backup

	... to remove backup
      	git update-ref -d refs/original/refs/heads/branchName

	...note some times other branch backup may exists...try to remove that also	

	)
    2) push all changes to remote   ...( if required use --force)
      git push origin -f --all    ( it will push to current branch)


   ref https://stackoverflow.com/questions/43762338/how-to-remove-file-from-git-history/43762489#43762489
   ref https://stackoverflow.com/questions/7654822/remove-refs-original-heads-master-from-git-repo-after-filter-branch-tree-filte

'

: '  below actions are done in mVBR

git filter-branch --index-filter "git rm -rf --cached --ignore-unmatch config/env.js" HEAD
git update-ref -d refs/original/refs/heads/branchName


git filter-branch --index-filter "git rm -rf --cached --ignore-unmatch config/default.json" HEAD
git update-ref -d refs/original/refs/heads/branchName

git filter-branch --index-filter "git rm -rf --cached --ignore-unmatch config/db.js" HEAD
git update-ref -d refs/original/refs/heads/branchName
        
git push origin -f --all


--------------------------------------- to revert ( to go ) to particular commit------------------

git reset --hard commitId / branch


--------------------------------------- mirroring repo / coping repo ------------------
to do this alread an old-repo should exist and... one empty new-repo should be created in remote 

	git clone --bare old-url
	cd old-repo
	git lfs fetch --all         // only if large files exists in repo
	git push --mirror new-url
	git lfs push --all new-url  // only if large files exists in repo
	
	now we can delete local bare repo ( old-repo.git)
	cd ..
 	rm -rf old-repo.git

'


########################################### tmux ####################################################
alias t="tmux"
alias td="tmux detach" # current session                                                                ***
alias ta="tmux attach" # latest sesion                                                                  ***
alias tls="tmux ls" # to list all sessions                                                              ***


# Split Window ( actually Panes ) of current session # detach mode by default
alias twsv="tmux split-window -v " # + command?  ( creates horixzontal panes )                          **
alias twsh="tmux split-window -h " # + command?  ( creates vertical panes )                             **


#  sessions

alias ts="tmux new " # +  command?         
alias tsl="tmux ls"                  
alias tsn="tmux new -s " # name +  command?     # named session                                         **
alias tsd="tmux new -d "  # + command?               # create detach mode sessiom                       ***
alias tsa="tmux attach -t " # + name_or_id      
alias tsac="tmux split-window -h -t " # name_or_id + command?                                           ****
                #  tmux session add command  
                # session name_or_id is mandatory
alias tsr="tmux rename-session -t " # name_or_id + new_name                                             ***

alias tsk="tmux kill-session -t " # + name_or_id


# Commands to execute
 ## tmux commands
function tcs(){
     
     if [ "$#" -lt 1 ]; then
        echo "Error: At least one argument is required."
    fi

    tmux new -d $1

    shift  # remove the first one


    for arg in "$@"; do
      tmux split-window -h $arg
    done
}

function tcsh(){
     
     if [ "$#" -lt 1 ]; then
        echo "Error: At least one argument is required."
    fi

    tmux new -d $1

    shift  # remove the first one


    for arg in "$@"; do
      tmux split-window -v $arg  # vertical split creates horizontal panes
    done
}



# useful commands
: '
  Note: Ctrl + b is prefix key for short keys
  
  resize   => Ctrl + b then Ctrl + arrow-keys 
  switch   => Ctrl + b then arrow-keys          ( only arrow keys )
  detach   => Ctrl + b then d                                                                           **** 

  split h  => Ctrl + b then  %  # percentage
  spilit v => Ctrl + b the "    # quotes

'



####################################### npm & pnpm configurations ####################################
alias ns="npm start"
alias nrd="npm run dev"
alias nrt="npm run test"
alias nrs="npm run serve"
alias nr="npm run" # + any npm cmd
alias rmn="rm -r node_modules" # remove node modules
alias rmna="rm -r ./**/node_modules" # remove node modules






# pnpm
export PNPM_HOME="/home/ravinder/.pnpm-global"
export PATH="$PNPM_HOME:$PATH"
# pnpm end


alias p="pnpm"
alias pi="pnpm i"
alias pr="pnpm run"
alias pcv="pnpm create vite"
alias cra="pnpm create vite" # create react app
alias crav="pnpm create vite" # create react app


: '

npm update is not working ( npm i -g npm )
----------------------------------------------------------
  this happens bcz,
  "npm" command takes /usr/bin/npm  -> this is actually a link(symlink) file...which pints to lib/node_modules/npm/bin/npm-cli.js
   when update: npm i -g npm -> the latest npm is installed in global packeage folder ( in our case /home/ravinder/.npm-global )
   but when we run npm command, still the link file /usr/bin/npm is pointing to lib/node_modules/npm/bin/npm-cli.js
   
   so we need to change the link file ( /usr/bin/npm ) point to latest npm-cli.js
   
   
   1) first remove (move to other folder) the previous link file 
      $ rm /usr/bin/npm
      
   2) create a new link file in /usr/bin
     $ ln -s /home/ravinder/.npm-global/lib/node_modules/npm/bin/npm-cli.js /usr/bin/npm
     
     [ to create link file:- $ ln -s full_path_to_file destination_file ]
     [ to see link file actual path:- $ readlink /usr/bin/npm ]

'


####################################### linux system configuration ####################################

alias rui="sudo nautilus /" # root files // root UI   # sudo -i nautils (old )


####################################### Env variables ####################################

alias oe="gedit /etc/environment" # open env file
alias ee="gedit /etc/environment" # edit env file
alias re="source /etc/environment" # reload env


#################################  SDKMAN #######################################################
#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="$HOME/.sdkman"
[[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]] && source "$HOME/.sdkman/bin/sdkman-init.sh"


################################## NVM #################################################
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion


##############################################################################################


function greet(){
 echo "Hello Ravinder"
}