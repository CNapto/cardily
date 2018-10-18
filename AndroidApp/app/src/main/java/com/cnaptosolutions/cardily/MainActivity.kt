package com.cnaptosolutions.cardily

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import com.androidnetworking.AndroidNetworking
import com.google.android.gms.auth.api.signin.*
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.tasks.Task
import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : AppCompatActivity() {

    lateinit var mGoogleInClient:GoogleSignInClient
    lateinit var gso:GoogleSignInOptions
    val RC_SIGN_IN: Int = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        AndroidNetworking.initialize(applicationContext)
        val url = "http://cardily.herokuapp.com/graphql"
        gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(getString(R.string.default_web_client_id))
                .build()
        mGoogleInClient = GoogleSignIn.getClient(this,gso)
        googleSignin.setOnClickListener {
            view: View? -> signGoogle()
        }

        btLogout.visibility = View.INVISIBLE


       /* AndroidNetworking.post(url)
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
                })*/



    }

    private fun signGoogle() {
        val signinIntet: Intent = mGoogleInClient.signInIntent
        startActivityForResult(signinIntet,RC_SIGN_IN)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if(requestCode == RC_SIGN_IN){
            val task: Task<GoogleSignInAccount> = GoogleSignIn.getSignedInAccountFromIntent(data)
            handleResult(task)
        }
    }

    private fun handleResult(completedTask: Task<GoogleSignInAccount>) {
        try{
            val account:GoogleSignInAccount = completedTask.getResult(ApiException::class.java)
            updateUI(account)
        }catch (e:ApiException){
            Toast.makeText(this,e.toString(),Toast.LENGTH_SHORT).show()
        }
    }

    private fun updateUI(account: GoogleSignInAccount) {
        tvName.text = account.email
        btLogout.visibility = View.VISIBLE
        btLogout.setOnClickListener {
            view:View? -> mGoogleInClient.signOut().addOnCompleteListener { 
            task: Task<Void> -> tvName.text = ""
            btLogout.visibility = View.INVISIBLE
        }
        }
    }


}
