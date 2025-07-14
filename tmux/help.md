 
 Session = tmux session
 Pane = Terminal within tmux session
 Prefix Key = Ctrl + b

 Window = Parent Terminal of Pane
         - one window can have any no of Panes

         - in one tmux sessions we can have multiple windows      

 =====================================================================


1. to enter tmux
   $ tmux


==================================== Panes =====================================

2. for new Pane
    1. Ctrl + b  then '%'      ( for vertical Pane )  ( for % = Shift + 5 )                ****
        - Note: Ctrl key should be leaved before pressing  '%'

    2. Ctrl + b then "       ( horizontal Pane )  (quetations) ( for " = Shift + " )       ****
           
       
3. to switch between Panes
    $ Ctrl + b then arrow-keys                                                             ****

    $ Ctrl + B then 'o'   // to next pane ( not zero...it's o - Open's o)                  ****
             
4. resizing the Panes
    Ctrl + b then Ctrl + arrow-keys                                                        ****
       
       - Note: after prefix key ( Ctrl + b ) again Ctrl + arrow keys

5. for exit (close) Pane
   $ exit


================================== windows =========================

6. to create a new window

   $ Ctrl + b then c                                                                       *

     - active window is marked with '*'
     - window name is shown at the bottom-left

7. to switch between windows

   $ Ctrl + b then 'window-number'   // window number we can see at the bottom-left        *

8. to rename window

   $ Ctrl + b then , ( comma )
      - then enter text the press enter

9. to exit window
   $ exit

========================== Sessions =======================

10. to dettach the current session
   $ Ctrl + b then d                                                                       ****
      - we can directly close the terminal also

11. to list tmux sessions
   $ tmux ls                                                                               ****

12. to attch session
   $ tmux attach -t session_name_or_number   ( session-number we can see from the list )   ****

       - '-t' = target session

   $ tmux attach     ( attaches the last session )


13. to rename session
   $ tmux rename-session -t session-number


14. to create session
   $ tmux new  

15. to create session with name
  $ tmux new -s session_name                                                               ****

16. to kill / stop session
  $ tmux kill-session -t session_name_or_number                                            ****


=========================  Impornat ==============

17. new session & command_to_execute from CMD

   $ tmux new 'command_to_execute'                                                           ****

     eg: tmux new 'serve -p 3000'

18. new session & detach mode & command_to_execute from CMD

    $ tmux new -d 'command_to_execute'                                                       ****

    eg: tmux new -d 'serve -p 3000'


19. new session with name & detach mode & command_to_execute from CMD
    
    $ tmux new -s session_name -d 'command_to_execute'                                       ****

    eg: tmux new -s s1 -d 'serve -p 3000'                                               


19. to add new pane to existing session from CMD                                

   $ tmux split-window -t session_name_or_number -v 'command_to_execute'                     ****

   eg: tmux split-window -t s1 -v 'serve -p 4000'
   eg: tmux split-window -t s1 -h 'serve -p 5000'

       Note:-  '-v' for vertial split
               '-h' for horizontal split
               


       Note:-  Ctrl + b the % or "  executes split-window command under the hood         



20. new session & multiple Panes in detach mode
    tmux new -s s1  -d 'serve -p 3000' \; split-window -h -t s1 'top'    # top is command    *

    or
    tmux new -s s1 -d 'serve -p 3000' && tmux split-window -h -t s1 'top' 

   
