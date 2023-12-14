package edu.iastate.cs472.proj1;

import java.util.Iterator;
import java.util.NoSuchElementException;

/**
 *  
 * @author Colsen Selk
 *
 */

/**
 * This class describes a circular doubly-linked list of states to represent both the OPEN and CLOSED lists
 * used by the A* algorithm.  The states on the list are sorted in the  
 * 
 *     a) order of non-decreasing cost estimate for the state if the list is OPEN, or 
 *     b) lexicographic order of the state if the list is CLOSED.  
 * 
 */
public class OrderedStateList 
{

	/**
	 * Implementation of a circular doubly-linked list with a dummy head node.
	 */
	  private State head;           // dummy node as the head of the sorted linked list 
	  private int size = 0;
	  
	  private boolean isOPEN;       // true if this OrderedStateList object is the list OPEN and false 
	                                // if the list CLOSED.

	  /**
	   *  Default constructor constructs an empty list. Initialize heuristic. Set the fields next and 
	   *  previous of head to the node itself. Initialize instance variables size and heuristic. 
	   * 
	   * @param h 
	   * @param isOpen   
	   */
	  public OrderedStateList(Heuristic h, boolean isOpen)
	  {
		  //	TODO
		  //this.head.heu = h;   // initialize heuristic used for evaluating all State objects. 
		  State.heu = h;
		  this.isOPEN = isOpen;

	  }

	  
	  public int size()
	  {
		  return size; 
	  }
	  
	  
	  /**
	   * A new state is added to the sorted list.  Traverse the list starting at head.  Stop 
	   * right before the first state t such that compareStates(s, t) <= 0, and add s before t.  
	   * If no such state exists, simply add s to the end of the list. 
	   * 
	   * Precondition: s does not appear on the sorted list. 
	   * 
	   * @param s
	   */
	  public void addState(State s)
	  {
		  // TODO: This is probably broken in some way. if so, fix
		  if (s == null) {
			  //System.out.println("s is null\n"); // for testing
			  return;
		  }
		  
		  if (this.head == null) {
			  this.head = s;
			  this.head.next = this.head;
			  this.head.previous = this.head;
			  this.size = this.size + 1;
			  
			  //System.out.println("for testing head: \n"+ this.head.toString() + isOPEN); // for testing
			  //System.out.println("for testing head.next: \n"+ this.head.next.toString() + isOPEN); // for testing
			  
			  return;
		  }
		  State t = null;
		  if (compareStates(s, this.head) <= 0) {
			  t = this.head;
			  s.next = t;
			  s.previous = t.previous;
			  State beforeT = t.previous;
			  beforeT.next = s;
			  t.previous = s;
			  this.head = s;
			  this.size = this.size + 1;
			  return;
		  }
		  t = this.head.next;
		  while (true) {
			  if (t.equals(this.head)) { // if reached end of list
				  s.next = this.head;
				  
				  State beforeT = this.head.previous;
				  s.previous = beforeT;
				  beforeT.next = s;
				  this.head.previous = s;
				  this.size = this.size + 1;
				  return;
			  }
			  if (compareStates(s, t) <= 0) { // add s before t
				  s.next = t;
				  s.previous = t.previous;
				  State beforeT = t.previous;
				  beforeT.next = s;
				  t.previous = s;
				  this.size = this.size + 1;
				  return;
			  }
			  t = t.next;
			  
		  }
	  }
	  
	  
	  /**
	   * Conduct a sequential search on the list for a state that has the same board configuration 
	   * as the argument state s.  
	   * 
	   * Calls equals() from the State class. 
	   * 
	   * @param s
	   * @return the state on the list if found
	   *         null if not found 
	   */
	  public State findState(State s)
	  {
		  // TODO: fix if broken
		  State t = this.head;
		  if (s.equals(t)) {
			  return this.head;
		  }
		  t = t.next;
		  while (true) {
			  if (t.equals(this.head)) {
				  return null;
			  }
			  if (s.equals(t)) {
				  return t;
			  }
			  t = t.next;
		  }
		  //return null; 
	  }
	  
	  
	  /**
	   * Remove the argument state s from the list.  It is used by the A* algorithm in maintaining 
	   * both the OPEN and CLOSED lists. 
	   * 
	   * @param s
	   * @throws IllegalStateException if s is not on the list 
	   */
	  public void removeState(State s) throws IllegalStateException
	  {
		  // TODO: fix if broken
		  if (this.head == null) {
			  throw new IllegalStateException();
			  //return null;
		  }
		  State t = this.head;
		  State rm = null;
		  boolean stop = false;
		  if (s.equals(t)) {
			  rm = this.head;
			  stop = true;
		  } else {
			t = t.next;
		  }
		  while (true) {
			  if (stop) {
				  break;
			  }
			  if (t.equals(this.head)) {
				  throw new IllegalStateException();
				  //return null;
			  }
			  if (s.equals(t)) {
				  rm = t;
				  break;
			  }
			  t = t.next;
		  }
		  
		  State prevState = rm.previous;
		  State nextState = rm.next;
		  prevState.next = nextState;
		  nextState.previous = prevState;
		  
		  rm = null;
		  
		  this.size = this.size - 1;
		  
		  return; 
	  }
	  
	  
	  /**
	   * Remove the first state on the list and return it.  This is used by the A* algorithm in maintaining
	   * the OPEN list. 
	   * 
	   * @return  
	   */
	  public State remove()
	  {
		  // TODO: fix if broken
		  
		  //printList(); // for testing
		  if (this.head == null) { // if nothing in the linked list
			  return null;
		  }
		  if (this.head.next == this.head) { // if only one state in the linked  list
			  State returnState = (State) (this.head).clone();
			  returnState.move = this.head.move;
			  returnState.predecessor = this.head.predecessor;
			  this.head = null;
			  return returnState;
		  }
		  
		  
		  //State nextState = this.head.next;
		  //State prevState = nextState.previous.previous;
		  State returnState = (State) (this.head).clone();
		  returnState.move = this.head.move;
		  returnState.predecessor = this.head.predecessor;
		  
		  (this.head.previous).next = this.head.next;
		  (this.head.next).previous = this.head.previous;
		  State newHead = this.head.next;
		  this.head = null;
		  this.head = newHead;
		  
		  //printList();
		  
		  //this.head = nextState;
		  //prevState.next = nextState;
		  //nextState.previous = prevState;
		  
		  return returnState;
	  }
	  
	  
	  /**
	   * Compare two states depending on whether this OrderedStateList object is the list OPEN 
	   * or the list CLOSE used by the A* algorithm.  More specifically,  
	   * 
	   *     a) call the method compareTo() of the State if isOPEN == true, or 
	   *     b) create a StateComparator object to call its compare() method if isOPEN == false. 
	   * 
	   * @param s1
	   * @param s2
	   * @return -1 if s1 is less than s2 as determined by the corresponding comparison method
	   *         0  if they are equal 
	   *         1  if s1 is greater than s2
	   */
	  private int compareStates(State s1, State s2)
	  {
		  // TODO: fix if broken
		  s1.cost();
		  s2.cost();
		  if (this.isOPEN) {
			  return s1.compareTo(s2);
		  } else {
			  StateComparator stateComp = new StateComparator();
			  return stateComp.compare(s1, s2);
		  }
			  
		  
		  //return 0; 
	  }
	  
	  private void printList() {
		System.out.println("list: \n"+ this.head.previous.toString() + " Cost: " + this.head.previous.cost());  
		System.out.println(this.head.toString() + " Cost: " + this.head.cost()); 
		System.out.println(this.head.next.toString() + " Cost: " + this.head.next.cost()); 
		System.out.println(this.head.next.next.toString() + " Cost: " + this.head.next.next.cost()); 
	  }
}
