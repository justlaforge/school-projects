// Justin LaForge
// English 231 Final Project

// Online Java Compiler to test program https://www.tutorialspoint.com/online_java_compiler.php

import java.util.Scanner;
import java.util.function.Function;

public class zombies{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int input; 
        boolean cont = true;

        System.out.println("Welcome to a choose your own adventure zombie game.\nYou will be following "
                            + "along with a story but along the way you will be prompted with your own choices"
                            +". to make, choose the right paths to surviveLets begin!\n");

        while(cont == true){
            boolean sect2p2 = false;

            //Section 1
            while(true){

                // The Story
                System.out.println("You wake up in your bed and you think it's just another regular day, "+
                                    "but you look outside and to your surprise a horde of ZOMBIES are coming your way!");

                System.out.println("Luckily you were prepared for this occasion, you have boards you can use to board up your windows, you have a stockpile of guns in the basement, and you have a car in the back to make a quick escape.");
                
                // The Options
                System.out.print( "   Option 1: Board up windows\n"+
                                    "   Option 2: Go to the basement\n"+
                                    "   Option 3: Go to the car\n"+
                                    "   Your choice: ");
                input = sc.nextInt();
                System.out.println();

                // The Result
                if(input == 1){

                    // Option 1
                    System.out.println("--You chose option 1--");
                    System.out.println();

                    System.out.println("You boarded up the windows, and wait for the horde to pass but given time the "+
                    "zombies break in, there is now nowhere to run and you are surrounded. The zombies start eating away at your flesh.");

                    // Retry
                    System.out.print("Would you like to retry?\n1. Yes\n2. No\nAnswer: ");
                    input = sc.nextInt();
                    System.out.println();
                    if(input==1) continue;
                    else {
                        cont = false;
                        break;
                    }

                } else if(input==2){
        
                    // Option 2
                    System.out.println("--You chose option 2--");
                    System.out.println();

                    System.out.println("You run to the basement to grab your guns, but you are now trapped, the zombies break "+
                    "into your house and flood the basement, you try to use your guns to your advantage, but there's too many, you are of no match.");

                    // Retry
                    System.out.print("Would you like to retry?\n1. Yes\n2. No\nAnswer: ");
                    input = sc.nextInt();
                    System.out.println();
                    if(input==1) continue;
                    else {
                        cont = false;
                        break;
                    }

                }  else if(input==3){

                    // Option 3
                    System.out.println("--You chose option 3--");
                    System.out.println();

                    System.out.println("You run out to the car and escape just before the horde reaches your house, "+
                    "you are safe, but the horde is still following you so you keep driving.");
                    break;

                } else {
                    System.out.println("--Not a valid option. please try again.--");
                }
            }

            //Section 2
            while(true){
    
                // The Story
                System.out.println("As you are driving you come across a dark and suspicous tunnel on the road, the zombies are still following you."+
                "You can either go through the tunnel or turn back");
    
                // The Options
                System.out.print( "   Option 1: Drive through the tunnel\n"+
                                    "   Option 2: Turn around\n"+
                                    "   Option 3: Get out of the car and walk through\n"+
                                    "   Your choice: ");
                input = sc.nextInt();
                System.out.println();
    
                // The Result
                if(input == 1){
    
                    // Option 1
                    System.out.println("--You chose option 1--");
                    System.out.println();
                    
                    System.out.println("You chose to take the car into the tunnel, it seems to have been a good move... for now.");
    
                    break;
    
                } else if(input==3){
        
                    // Option 3
                    System.out.println("--You chose option 3--");
                    System.out.println();

                    System.out.println("You figured the car may attract too many zombies in the tunnel so you decide to "+
                    "go on foot, you are safe for now.");
                    sect2p2 = true;
                    break;

    
                }  else if(input==2){
    
                    // Option 2
                    System.out.println("--You chose option 2--");
                    System.out.println();

                    System.out.println("You turn the car around and start driving back, but the zombies crowd the road and"+
                    " start surrounding you car, you are now trapped and they have broken in and start tearing you apart.");

                    // Retry
                    System.out.print("Would you like to retry?\n1. Yes\n2. No\nAnswer: ");
                    input = sc.nextInt();
                    System.out.println();
                    if(input==1) continue;
                    else {
                        cont = false;
                        break;
                    }
    
                } else {
                    System.out.println("--Not a valid option. please try again.--");
                }
            }

            //Section 2 part 2
            while(true && sect2p2){
    
                // The Story
                System.out.println("You are walking along on foot now, you come accross a body of a soldier, he seems to be carrying"+
                " a shotgun, you pick it up, but shortly after you here growling and footsteps around you, suddenly a pack"+
                " of zombie dogs come out of the debris in front of you, think quickly.");
    
                // The Options
                System.out.print( "   Option 1: Use the shotgun\n"+
                                    "   Option 2: Runaway\n"+
                                    "   Option 3: Try petting the good boys\n"+
                                    "   Your choice: ");
                input = sc.nextInt();
                System.out.println();
    
                // The Result
                if(input == 1){
    
                    // Option 1
                    System.out.println("--You chose option 1--");
                    System.out.println();
                    
                    System.out.println("The dogs start to attack you and your instinct is to reach for the gun, before you know it it's"+
                    " all over and everything is silent, the zombie dogs lie still on the ground and you can move forward.");
                    
                    break;
    
                } else if(input==2){
        
                    // Option 2
                    System.out.println("--You chose option 2--");
                    System.out.println();

                    System.out.println("You turn and run but these zombie dogs are faster than regular dogs and catch up to you."+
                    " They start biting at your legs and jumping at you, you end up on the ground and the dogs swarm you, it's all over now.");

                    // Retry
                    System.out.print("Would you like to retry?\n1. Yes\n2. No\nAnswer: ");
                    input = sc.nextInt();
                    System.out.println();
                    if(input==1) continue;
                    else {
                        cont = false;
                        break;
                    }

    
                }  else if(input==3){
    
                    // Option 3
                    System.out.println("--You chose option 3--");
                    System.out.println();

                    System.out.println("You chose to try and pet the dogs, though it may not be a rational move you thought these were good dogs... "+
                    " You quickly find out they are not as one of the dogs digs it's teeth into your hand and you scream in pain."+
                    " This is not how you would've imagined going out but it is happening, at least you tried to pet the dogs though.");

                    // Retry
                    System.out.print("Would you like to retry?\n1. Yes\n2. No\nAnswer: ");
                    input = sc.nextInt();
                    System.out.println();
                    if(input==1) continue;
                    else {
                        cont = false;
                        break;
                    }
    
                } else {
                    System.out.println("--Not a valid option. please try again.--");
                }
            }

            //Section 3
            while(true){
    
                // The Story
                if(sect2p2 == true){
                    System.out.print("As you are walking you come accross a large pile of debris, you start to climb over it to get to the other side. "); 
                } else {
                    System.out.print("As you are driving you come accross a large pile of debris and you have to ditch the car. "+
                    "You get out of the car and start to climb up the pile. "); 
                }
                System.out.println("You reach the top but on the other side"+
                " there is a huge horde of zombies. You have to get accross, luckily there happens to be a fire truck with a ladder reaching"+
                " across the horde, there is also a container of flairs you may be able to use. Time to make a move.");

    
                // The Options
                System.out.print( "   Option 1: Use the ladder to climb over the horde\n"+
                                    "   Option 2: Use the flairs to distract the zombies\n"+
                                    "   Option 3: You've made it this far, you must be invincible, just push you way through\n"+
                                    "   Your choice: ");
                input = sc.nextInt();
                System.out.println();
    
                // The Result
                if(input == 1){
    
                    // Option 1
                    System.out.println("--You chose option 1--");
                    System.out.println();
                    
                    System.out.println("You reach the firetruck and start climbing accross the ladder, the zombies are just"+
                    " a couple of feet below you, but they do not see you, you reach the end of the ladder and the "+
                    " zombies are far enough behind you so you can jump down.");
    
                    break;
    
                } else if(input==2){
        
                    // Option 2
                    System.out.println("--You chose option 2--");
                    System.out.println();

                    System.out.println("You grab a couple of flairs from the box and light them up, you throw them to the other side of the"+
                    " tunnel and the zombies all head toward it, there is now an open path you can use to get across. You run through as fast as you can and make it to the other side");
    
                    break;

    
                }  else if(input==3){
    
                    // Option 3
                    System.out.println("--You chose option 2--");
                    System.out.println();

                    System.out.println("You feel you have the chance to push your way through the zombies, so you jump down and start running through"+
                    " the zombies, all the zombies start closing in on you and you are surrounded, they start eating away at your flesh. You are dead.");

                    // Retry
                    System.out.print("Would you like to retry?\n1. Yes\n2. No\nAnswer: ");
                    input = sc.nextInt();
                    System.out.println();
                    if(input==1) continue;
                    else {
                        cont = false;
                        break;
                    }
    
                } else {
                    System.out.println("--Not a valid option. please try again.--");
                }
            }
            
            boolean sewers = false;
            //Section 4
            while(true){
    
                // The Story
                System.out.println("You finally come out the other side of the tunnel, from here you can see the city,"+
                " there seems to be a hospital with a rescue team in the middle of the city, this is just what you need but"+
                " getting there wont be easy, as zombies crowd the streets. Right by you is a passage to the sewage system, this could"+
                " take you straight to the hospital. You have 2 available paths.");

    
                // The Options
                System.out.print( "   Option 1: Continue to walk the streets\n"+
                                    "   Option 2: Take the sewers and avoid the crowd of zombies on the streets\n"+
                                    "   Your choice: ");
                input = sc.nextInt();
                System.out.println();
    
                // The Result
                if(input == 1){
    
                    // Option 1
                    System.out.println("--You chose option 1--");
                    System.out.println();

                    if(sect2p2){
                        System.out.println("You decided to stick to the surface, there are zombies crowding the streets, but luckily you are armed."+
                        " zombies start crowding in on you but you are able to use you gun to defend yourself."+
                        " after lots sweat and bullets you make it to the hospital.");
                        break;
                    } else {
                        System.out.println("You decided to stick to the surface, there are zombies crowding the streets, you try to sneak past them"+
                        " but zombies start to notice your presence. You break into a sprint to escape,"+
                        " but you run into a dead end and the zombies have you cornered and it does not end well.");

                        // Retry
                        System.out.print("Would you like to retry?\n1. Yes\n2. No\nAnswer: ");
                        input = sc.nextInt();
                        System.out.println();
                        if(input==1) continue;
                        else {
                            cont = false;
                            break;
                        }
                    }
    
                } else if(input==2){
        
                    // Option 2
                    System.out.println("--You chose option 2--");
                    System.out.println();

                    System.out.println("You decided to take the sewers. As you traverse the sewers a hand reaches out from the water and grabs your leg."+
                    " It feels almost like a claw digging into your skin, your leg is cut open as you grab your gun and quickly shoot at the creature"+
                    ". The hand loses grasp and you are able to escape, limping from your wounded leg. You reach the surface"+
                    " and luckily the hopsital is right there.");
                    
                    sewers = true;
                    break;
                } else {
                    System.out.println("--Not a valid option. please try again.--");
                }
            }

            //Section 5
            while(true && sewers){
    
                // The Story
                System.out.println("You start to head to the hospital, but your leg starts to burn up and you start to feel sick."+
                " Something doesn't seem right, there seems to be only one more helicopter and it's about to take off. There is also a "+
                " Doctor taking care of injured survivors, but you could miss the last helicopter out of here if you go to him.");

    
                // The Options
                System.out.print( "   Option 1: Get on the helicopter\n"+
                                    "   Option 2: Stay behind and get help\n"+
                                    "   Your choice: ");
                input = sc.nextInt();
                System.out.println();
    
                // The Result
                if(input == 1){
    
                    // Option 1
                    System.out.println("--You chose option 1--");
                    System.out.println();

                        System.out.println("You didn't want to miss the helicopter out of here, so you decided to suffer through the pain and get"+
                        " on the helicopter. While in the middle of the air, you begin to feel faint, and start to get dizzy. Suddenly you lose control and"+
                        " start attacking the other survivors, the pilot then pulls a gun on you and without knowing why you bite his arm and he loses control of the vehicle. "+
                        "The helicopter comes crashing down and no one survives.");

                        // Game Over
                        System.out.print("Would you like to retry?\n1. Yes\n2. No\nAnswer: ");
                        input = sc.nextInt();
                        System.out.println();
                        if(input==1) continue;
                        else {
                            cont = false;
                            break;
                        }
                    
    
                } else if(input==2){
        
                    // Option 2
                    System.out.println("--You chose option 2--");
                    System.out.println();

                    System.out.println("Decided to stay behind to get help, the doctors say your leg is infect and they need to cut it off "+
                    "or you will die and become infected. They lie you down on the bed and give you medicine that makes you pass out. "+
                    "You wake up in a hospital far from the city, days have gone by, you see on the news the city you were in has been destroyed"+
                    " to stop the spread of the infection and kill all zombies.");


                    // The End
                    System.out.print("The end. Would you like to play again?\n1. Yes\n2. No\nAnswer: ");
                    input = sc.nextInt();
                    System.out.println();
                    if(input==1) break;
                    else {
                        cont = false;
                        break;
                    }
                } else {
                    System.out.println("--Not a valid option. please try again.--");
                }
            }

            //Section 5
            while(true && sewers == false){
    
                // The Story
                System.out.println("You head to the hospital and they take you to the helicopter, this is the last one out of the city, you get on"+
                " and it takes off, taking you out of the city and far away. While flying through the air a missle flies by you  "+
                " heading in the direction of the city, a couple of seconds go by and you look at the city and it goes up in flames. You have survived, and the zombies have all been killed... or so it seems.");


                // The End
                System.out.print("The end. Would you like to play again?\n1. Yes\n2. No\nAnswer: ");
                input = sc.nextInt();
                System.out.println();
                if(input==1) break;
                else {
                    cont = false;
                    break;
                }

            }
            
            
        }
        
        
    }

}