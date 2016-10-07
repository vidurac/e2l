@extends('layouts.master')

@section('content')

    <h1>Homegiftcard</h1>
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>ID.</th> <th>Card Id</th><th>House Id</th><th>Points</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ $homegiftcard->id }}</td> <td> {{ $homegiftcard->card_id }} </td><td> {{ $homegiftcard->house_id }} </td><td> {{ $homegiftcard->points }} </td>
                </tr>
            </tbody>    
        </table>
    </div>

@endsection