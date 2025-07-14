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



# useful commands
: '
  Note: Ctrl + b is prefix key for short keys
  
  resize   => Ctrl + b then Ctrl + arrow-keys 
  switch   => Ctrl + b then arrow-keys          ( only arrow keys )
  detach   => Ctrl + b then d                                                                           **** 

  split h  => Ctrl + b then  %  # percentage
  spilit v => Ctrl + b the "    # quotes

'