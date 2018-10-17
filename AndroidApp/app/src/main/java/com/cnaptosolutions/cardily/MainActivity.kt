package com.cnaptosolutions.cardily

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.androidnetworking.AndroidNetworking
import com.androidnetworking.common.Priority
import com.androidnetworking.error.ANError
import org.json.JSONArray
import com.androidnetworking.interfaces.JSONArrayRequestListener
import com.androidnetworking.interfaces.JSONObjectRequestListener
import org.json.JSONObject
import com.android.volley.toolbox.Volley
import com.android.volley.VolleyError
import com.google.gson.JsonObject


class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        AndroidNetworking.initialize(applicationContext)
        val url = "http://cardily.herokuapp.com/graphql"
        AndroidNetworking.post(url)
                .addBodyParameter("query","{users{name,email}}")
                .setTag("test")
                .setPriority(Priority.MEDIUM)
                .build()
                .getAsJSONObject(object : JSONObjectRequestListener {
                    override fun onResponse(response: JSONObject) {
                        // do anything with response
                        Log.d("JSON_DATA",response.toString())
                        var names = ""
                        val data:JSONObject = response.getJSONObject("data")
                        val users:JSONArray = data.getJSONArray("users")
                        for(i in 0 until users.length()){
                            val detail:JSONObject = users.getJSONObject(i)
                            val name:String = detail.getString("name")
                            Log.d("Name",name)
                        }

                    }

                    override fun onError(error: ANError) {
                        // handle error
                        Log.e("JSON_ERROR",error.errorCode.toString())
                        Toast.makeText(this@MainActivity,error.errorBody.toString(),Toast.LENGTH_SHORT).show()
                    }
                })

    }


}
