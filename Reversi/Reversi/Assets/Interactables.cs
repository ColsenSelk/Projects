using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class Interactables : MonoBehaviour
{
    public Side currentTeam;
    public GameObject _whiteButton;
    public GameObject _blackButton;
    public GameObject _hardButton;
    public GameObject _mediumButton;
    public GameObject _easyButton;
    private int difficulty;

    public int GetDifficulty()
    {
        return difficulty;
    }

    // Start is called before the first frame update
    void Start()
    {
        currentTeam = Side.Empty;
        difficulty = -1;
        //Button whiteButton = _whiteButton.GetComponent<Button>();
        _whiteButton.SetActive(true);
        _blackButton.SetActive(true);
        _easyButton.SetActive(false);
        _mediumButton.SetActive(false);
        _hardButton.SetActive(false);
        _whiteButton.GetComponent<Button>().onClick.AddListener(delegate () { ChooseTeam("White"); });
        //Button blackButton = _whiteButton.GetComponent<Button>();
        _blackButton.GetComponent<Button>().onClick.AddListener(delegate () { ChooseTeam("Black"); });
        _easyButton.GetComponent<Button>().onClick.AddListener(delegate () { SetDifficulty(3); });
        _mediumButton.GetComponent<Button>().onClick.AddListener(delegate () { SetDifficulty(5); });
        _hardButton.GetComponent<Button>().onClick.AddListener(delegate () { SetDifficulty(7); });

    }

    void ChooseTeam(string team)
    {
        if (team.CompareTo("White") == 0)
        {
            currentTeam = Side.Black;
        }
        else
        {
            currentTeam = Side.White;
        }
        _whiteButton.SetActive(false);
        _blackButton.SetActive(false);
        _easyButton.SetActive(true);
        _mediumButton.SetActive(true);
        _hardButton.SetActive(true);
        //_whiteButton.
    }

    void SetDifficulty(int difficulty)
    {
        this.difficulty = difficulty;
        _easyButton.SetActive(false);
        _mediumButton.SetActive(false);
        _hardButton.SetActive(false);
        
    }

    // Update is called once per frame
    /*void Update()
    {
        
    }*/
}
