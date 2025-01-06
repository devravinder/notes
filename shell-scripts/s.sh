
removeFileCommitHistory()
{
	git filter-branch --index-filter "git rm -rf --cached --ignore-unmatch $1" $2  ## $1 file $2 branch
}


readBranch()
{
  while true; do
    read -p "is file related to current branch yes/no ?" yn
    case $yn in
        [Yy]* ) return "HEAD";
        [Nn]* ) echo "Enter branch name"; read branchName; return branchName;
        * ) echo "Please answer yes or no.";;
    esac
done
}

while true; do
    read -p "Do you wish to install this program?" yn
    case $yn in
        [Yy]* ) echo "yes"; break;;
        [Nn]* ) echo "no"; exit;;
        * ) echo "Please answer yes or no.";;
    esac
done
