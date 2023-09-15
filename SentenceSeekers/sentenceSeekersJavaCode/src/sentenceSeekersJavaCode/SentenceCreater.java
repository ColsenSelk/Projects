package sentenceSeekersJavaCode;
import java.util.*;
import java.net.*;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

// constructs basic sentences after calling upon Sentence to define words.
public class SentenceCreater {
	
	/**
	 * initiallizes variables
	 */
	private String verb1;
	private String verb2;
	private String noun1;
	private String noun2;
	private String adjective1;
	private String adjective2;
	private String adverb1;
	private String adverb2;
	private int numVerb;
	private int numNoun;
	private int numAdjective;
	private int numAdverb;
	
	/**
	 * assigns given variables, determines how many of each part of speech exists.
	 * @param aVerb
	 * @param bVerb
	 * @param aNoun
	 * @param bNoun
	 * @param aAdjective
	 * @param bAdjective
	 * @param aAdverb
	 * @param bAdverb
	 * @param verbCount
	 * @param nounCount
	 * @param adjectiveCount
	 * @param adverbCount
	 * @return
	 */
	public SentenceCreater(String aVerb, String bVerb, String aNoun, String bNoun, String aAdjective, String bAdjective, String aAdverb, String bAdverb, int verbCount, int nounCount, int adjectiveCount, int adverbCount) {
		verb1 = aVerb;
		verb2 = bVerb;
		noun1 = aNoun;
		noun2 = bNoun;
		adjective1 = aAdjective;
		adjective2 = bAdjective;
		adverb1 = aAdverb;
		adverb2 = bAdverb;
		numVerb = verbCount;
		numNoun = nounCount;
		numAdjective = adjectiveCount;
		numAdverb = adverbCount;
		
		
	}
	
	public void sentenceOutput() {
		Random r = new Random();
		if (numVerb == 1 && numNoun == 1 && numAdjective == 0 && numAdverb == 0) {
			System.out.println("The " + noun1 +  " " + verb1 + ".");
			
		}
		else if (numVerb == 1 && numNoun == 1 && numAdjective == 1 && numAdverb == 0) {
			System.out.println("The "+ adjective1 + " " + noun1 + " " + verb1 + ".");
		}
		else if (numVerb == 1 && numNoun == 1 && numAdjective == 2 && numAdverb == 0) {
			System.out.println("The "+ adjective1 + " " + adjective2 + " " + noun1 + " " + verb1 + ".");
		}
		else if (numVerb == 1 && numNoun == 1 && numAdjective == 0 && numAdverb == 1) {
			System.out.println("The " + noun1 +  " " + " " + adverb1 + " " + verb1 + ".");
		}
		else if (numVerb == 1 && numNoun == 1 && numAdjective == 0 && numAdverb == 2) {
			System.out.println("The " + noun1 +  " " + " " + adverb1 + " "  + adverb2 + " " + verb1 + ".");
		}
		else if (numVerb == 1 && numNoun == 1 && numAdjective == 1 && numAdverb == 1) {
			System.out.println("The "+ adjective1 + " " + noun1 + " " + adverb1 + " " + verb1 + ".");
		}
		else if (numVerb == 1 && numNoun == 1 && numAdjective == 1 && numAdverb == 2) {
			System.out.printf("The %s %s had %s %s %s.\n", adjective1, noun1, adverb1, adverb2, verb1);
		}
		else if (numVerb == 1 && numNoun == 1 && numAdjective == 2 && numAdverb == 1) {
			System.out.printf("The %s %s %s had %s %s.\n", adjective1, adjective2, noun1, adverb1, verb1);
		}
		else if (numVerb == 1 && numNoun == 1 && numAdjective == 2 && numAdverb == 2) {
			System.out.printf("The %s %s %s had %s %s %s.\n", adjective1, adjective2, noun1, adverb1, adverb2, verb1);
		}
		else if (numVerb == 2 && numNoun == 1 && numAdjective == 0 && numAdverb == 0) {
			System.out.printf("The %s %s and %s.\n", noun1, verb1, verb2);
		}
		else if (numVerb == 2 && numNoun == 1 && numAdjective == 1 && numAdverb == 0) {
			System.out.printf("The %s %s %s and %s.\n", adjective1, noun1, verb1, verb2);
		}
		else if (numVerb == 2 && numNoun == 1 && numAdjective == 2 && numAdverb == 0) {
			System.out.printf("The %s and %s %s %s and %s.\n", adjective1, adjective2, noun1, verb1, verb2);
		}
		else if (numVerb == 2 && numNoun == 1 && numAdjective == 0 && numAdverb == 1) {
			System.out.printf("The %s %s %s and %s.\n", noun1, adverb1, verb1, verb2);
		}
		else if (numVerb == 2 && numNoun == 1 && numAdjective == 0 && numAdverb == 2) {
			System.out.printf("The %s %s %s and %s %s.\n", noun1, adverb1, verb1, adverb2, verb2);
		}
		else if (numVerb == 2 && numNoun == 1 && numAdjective == 1 && numAdverb == 1) {
			System.out.printf("The %s %s %s %s and %s.\n", adjective1, noun1, adverb1, verb1, verb2);
		}
		else if (numVerb == 2 && numNoun == 1 && numAdjective == 1 && numAdverb == 2) {
			System.out.printf("The %s %s %s %s and %s %s.\n", adjective1, noun1, adverb1, verb1, adverb2, verb2);
		}
		else if (numVerb == 2 && numNoun == 1 && numAdjective == 2 && numAdverb == 1) {
			System.out.printf("The %s and %s %s %s %s and %s.\n", adjective1, adjective2, noun1, adverb1, verb1, verb2);
		}
		else if (numVerb == 2 && numNoun == 1 && numAdjective == 2 && numAdverb == 2) {
			System.out.printf("The %s and %s %s %s %s and %s %s.\n", adjective1, adjective2, noun1, adverb1, verb1, adverb2, verb2);
		}
		else if (numVerb == 1 && numNoun == 2 && numAdjective == 0 && numAdverb == 0) {
			System.out.printf("The %s and %s %s.\n", noun1, noun2, verb1);
		}
		else if (numVerb == 1 && numNoun == 2 && numAdjective == 1 && numAdverb == 0) {
			System.out.printf("The %s %s and %s %s.\n", adjective1, noun1, noun2, verb1);
		}
		else if (numVerb == 1 && numNoun == 2 && numAdjective == 2 && numAdverb == 0) {
			System.out.printf("The %s %s and %s %s %s.\n", adjective1, noun1, adjective2, noun2, verb1);
		}
		else if (numVerb == 1 && numNoun == 2 && numAdjective == 0 && numAdverb == 1) {
			System.out.printf("The %s and %s %s %s.\n", noun1, noun2, adverb1, verb1);
		}
		else if (numVerb == 1 && numNoun == 2 && numAdjective == 0 && numAdverb == 2) {
			System.out.printf("The %s and %s %s %s %s.\n", noun1, noun2, adverb1, adverb2, verb1);
		}
		else if (numVerb == 1 && numNoun == 2 && numAdjective == 1 && numAdverb == 1) {
			System.out.printf("The %s %s and %s %s %s.\n", adjective1, noun1, noun2, adverb1, verb1);
		}
		else if (numVerb == 1 && numNoun == 2 && numAdjective == 1 && numAdverb == 2) {
			System.out.printf("The %s %s and %s %s %s %s.\n", adjective1, noun1, noun2, adverb1, adverb2, verb1);
		}
		else if (numVerb == 1 && numNoun == 2 && numAdjective == 2 && numAdverb == 1) {
			System.out.printf("The %s %s and %s %s %s %s.\n", adjective1, noun1, adjective2, noun2, adverb1, verb1);
		}
		else if (numVerb == 1 && numNoun == 2 && numAdjective == 2 && numAdverb == 2) {
			System.out.printf("The %s %s and %s %s %s %s %s.\n", adjective1, noun1, adjective2, noun2, adverb1, adverb2, verb1);
		}
		else if (numVerb == 2 && numNoun == 2 && numAdjective == 0 && numAdverb == 0) {
			System.out.printf("The %s and %s %s and %s.\n", noun1, noun2, verb1, verb2);
		}
		else if (numVerb == 2 && numNoun == 2 && numAdjective == 1 && numAdverb == 0) {
			System.out.printf("The %s %s and %s %s and %s.\n", adjective1, noun1, noun2, verb1, verb2);
		}
		else if (numVerb == 2 && numNoun == 2 && numAdjective == 2 && numAdverb == 0) {
			System.out.printf("The %s %s and %s %s %s and %s.\n", adjective1, noun1, adjective2, noun2, verb1, verb2);
		}
		else if (numVerb == 2 && numNoun == 2 && numAdjective == 0 && numAdverb == 1) {
			System.out.printf("The %s and %s %s %s and %s.\n", noun1, noun2, adverb1, verb1, verb2);
		}
		else if (numVerb == 2 && numNoun == 2 && numAdjective == 0 && numAdverb == 2) {
			System.out.printf("The %s and %s %s %s and %s %s.\n", noun1, noun2, adverb1, verb1, adverb2, verb2);
		}
		else if (numVerb == 2 && numNoun == 2 && numAdjective == 1 && numAdverb == 1) {
			System.out.printf("The %s %s and %s %s %s and %s.\n", adjective1, noun1, noun2, adverb1, verb1, verb2);
		}
		else if (numVerb == 2 && numNoun == 2 && numAdjective == 1 && numAdverb == 2) {
			System.out.printf("The %s %s and %s %s %s and %s %s.\n", adjective1, noun1, noun2, adverb1, verb1, adverb2, verb2);
		}
		else if (numVerb == 2 && numNoun == 2 && numAdjective == 2 && numAdverb == 1) {
			System.out.printf("The %s %s and %s %s %s %s and %s.\n", adjective1, noun1, adjective2, noun2, adverb1, verb1, verb2);
		}
		else if (numVerb == 2 && numNoun == 2 && numAdjective == 2 && numAdverb == 2) {
			System.out.printf("The %s %s and %s %s %s %s and %s %s.\n", adjective1, noun1, adjective2, noun2, adverb1, verb1, adverb2, verb2);
		}
		else {
			System.out.println("Error: Problem with number of inputs");
		}
		
		
		
		
		
		
		
		
		
	}
	
	
}
