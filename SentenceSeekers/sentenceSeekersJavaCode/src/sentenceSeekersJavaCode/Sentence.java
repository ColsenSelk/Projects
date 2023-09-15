package sentenceSeekersJavaCode;
import java.util.*;


import java.applet.*;
import com.scraperapi.*;

import kong.unirest.Unirest;

import java.io.File;
import java.io.IOException;
import java.io.FileWriter;
import com.scraperapi.*;
import org.apache.*;

import java.util.concurrent.TimeUnit;


// performs the webscrape to gain information about the users inputs (finds out if words are a noun, verb, adjective, etc.)
public class Sentence {
	public static void main(String[] args) throws IOException{
		
	      
		
		// ask for amount of nouns, verbs, adjectives, and adverbs they want to use
		// have user assign all relevant variables
		// run SentenceCreater() with relevant parameters;
		
		/**
		 * initiallizes variables
		 */
		 Scanner tempScan = new Scanner(System.in);
		 String aVerb = "156l7nmflaoi2n6lFsasenytlfdnasd";
		 String bVerb = "156l7nmflaoi2n6lFsasenytlfdnasd";
		 String aNoun = "156l7nmflaoi2n6lFsasenytlfdnasd";
		 String bNoun = "156l7nmflaoi2n6lFsasenytlfdnasd";
		 String aAdjective = "156l7nmflaoi2n6lFsasenytlfdnasd";
		 String bAdjective = "156l7nmflaoi2n6lFsasenytlfdnasd";
		 String aAdverb = "156l7nmflaoi2n6lFsasenytlfdnasd";
		 String bAdverb = "156l7nmflaoi2n6lFsasenytlfdnasd";
		 int numVerb = 0;
		 int numNoun = 0;
		 int numAdjective = 0;
		 int numAdverb = 0;
		 
		 
		 String tempString2;
		 tempString2 = tempScan.nextLine();
		 Scanner tempScan2 = new Scanner(tempString2);
		 tempScan2.useDelimiter(" ");
		 
		 String tempString3;
		 String websitename;
		 String tempstring;
		 
		 
		 System.out.println("Sleeping for 2 second");
		 try {
			TimeUnit.SECONDS.sleep(2);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 
		 
		 
		 while(tempScan2.hasNext()) {
			 tempString3 = tempScan2.next();
			 websitename = "http://merriam-webster.com/dictionary/" + tempString3;
			 ScraperApiClient client = new ScraperApiClient("f5e450d823882f2efdb356a6c352443a");
				  tempstring = (client.get(websitename)
				  .result()).toString();
			 // test tempstring to see if it includes /noun /verb /adjective and/or /adverb
				  System.out.println("Checking");
			 
			 if(tempstring.contains("href=\"/dictionary/verb\">verb") && numVerb  < 2) {
				 if(numVerb == 0) {
					 aVerb = tempString3;
				 }
				 else if(numVerb == 1) {
					 bVerb = tempString3;
				 }
				 ++numVerb;
			 }
			 else if(tempstring.contains("href=\"/dictionary/noun\">noun") && numNoun < 2) {
				 if(numNoun == 0) {
					 aNoun = tempString3;
				 }
				 else if(numNoun == 1) {
					 bNoun = tempString3;
				 }
				 ++numNoun;
			 }
			 else if(tempstring.contains("href=\"/dictionary/adverb\">adverb") && numAdverb  < 2) {
				 if(numVerb == 0) {
					 aAdverb = tempString3;
				 }
				 else if(numVerb == 1) {
					 bAdverb = tempString3;
				 }
				 ++numAdverb;
			 }
			 
			 else if(tempstring.contains("href=\"/dictionary/adverb\">adverb") && numAdjective  < 2) {
				 if(numAdjective == 0) {
					 aAdjective = tempString3;
				 }
				 else if(numAdjective == 1) {
					 bAdjective = tempString3;
				 }
				 ++numAdjective;
			 }
			 else {
				 System.out.println("Error");
				 tempScan.close();
				 tempScan2.close();
				 return;
			 }
			 System.out.println("Sleeping for 10 second");
			 try {
				TimeUnit.SECONDS.sleep(10);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			 Unirest.config().reset();
		 }
		 
		 
		 
		 // assign tempstring to be at random something it is, or if there is already 2 of some word, make different word.
		 
		 
		 
		 /**
		  * Assigns variables based on how many variables there are.
		  */
		
		if(numVerb == 0) {
			System.out.println("Error: wrong amount of verbs");
			tempScan.close();
			tempScan2.close();
			return;
		}
		
		if(numNoun == 0) {
			System.out.println("Error: wrong amount of nouns");
			tempScan.close();
			tempScan2.close();
			return;
		}
		
		
		
		
		SentenceCreater c = new SentenceCreater(aVerb, bVerb, aNoun, bNoun, aAdjective, bAdjective, aAdverb, bAdverb, numVerb, numNoun, numAdjective, numAdverb);
		c.sentenceOutput();
		tempScan.close();
		tempScan2.close();
	}
}
