# this is to remove commit history of a file
echo "Enter brach name"
read branchName
echo "Enter file/folder name to be removed from commit history"
read fileName
git filter-branch --index-filter "git rm -rf --cached --ignore-unmatch $fileName" $branchName   ## HEAD

