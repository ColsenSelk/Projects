using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace SpaceRace3D
{
    internal class FileController
    {
        private int[] timeList = new int[100]; // time measured in seconds
        private int timeListSize = 100;
        
        public void WriteFile(int seconds)
        {
            File.AppendAllText("times.txt", seconds.ToString() + "\n");
            
            /*
            // add new time to file
            using (StreamWriter writetext = new StreamWriter("times.txt"))
            {
                const Int32 BufferSize = 128;
                using (var fileStream = File.OpenRead("times.txt"))
                using (var streamReader = new StreamReader(fileStream, Encoding.UTF8, true, BufferSize))
                {
                    String line;
                    while ((line = streamReader.ReadLine()) != null)
                    {
                        writetext.WriteLine(line);
                    }
                }
                writetext.WriteLine(seconds);
            }
            */
        }

        // reads shortest time
        public int ReadFile()
        {
            // gather list of all times in file
            List<int> integerList = new List<int>();

            const Int32 BufferSize = 128;
            using (var fileStream = File.OpenRead("times.txt"))
            using (var streamReader = new StreamReader(fileStream, Encoding.UTF8, true, BufferSize))
            {
                String line;
                while ((line = streamReader.ReadLine()) != null)
                {
                    if (int.TryParse(line, out int number))
                    {
                        integerList.Add(number);
                    }
                    else
                    {
                        Console.WriteLine("Error: Tried to read from file but failed");
                    }
                }
            }
            timeList = integerList.ToArray();

            // sort Times
            timeListSize = integerList.Count; // timeListSize = timeList.Length;
            QuickSortTime();

            //return first element of timeList
            return timeList[0];
        }

        // sort Times from low to high
        private void QuickSortTime()
        {
            QuickSort(timeList, 0, timeListSize - 1);
        }

        private static void QuickSort(int[] array, int low, int high)
        {
            if (low < high)
            {
                int pi = Partition(array, low, high);

                // Recursively sort elements before and after partition
                QuickSort(array, low, pi - 1);
                QuickSort(array, pi + 1, high);
            }
        }

        private static int Partition(int[] array, int low, int high)
        {
            
            int pivot = array[high]; // the pivot is the element to be placed in new position


            int i = (low - 1); // pointer for the smaller element

            for (int j = low; j < high; j++)
            {
                
                if (array[j] < pivot) // if current element is smaller than the pivot
                {
                    i++;
                    Swap(array, i, j);
                }
            }

            // Swap array[i + 1] and array[high] (or pivot)
            Swap(array, i + 1, high);

            return i + 1;
        }

        private static void Swap(int[] array, int i, int j)
        {
            int temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
}